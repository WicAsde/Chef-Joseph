import {
  Client,
  GatewayIntentBits,
  TextChannel,
  ChannelType,
  REST,
  Routes,
  ApplicationCommandOptionType,
} from "discord.js";
import cron from "node-cron";
import {
  fetchFormattedRecipe,
  fetchRandomRecipeOnDemand,
  fetchFranchiseRecipe,
  formatDailyRecipe,
  formatOnDemandRecipe,
  formatFranchiseRecipe,
} from "./recipe-service";
import {
  shouldPostToday,
  getNextDay,
  markPosted,
  getCurrentDay,
  getActiveChannels,
  addChannel,
  removeChannel,
  addRating,
  getTopRatedRecipesWithTitles,
} from "./day-tracker";
import { logger } from "../lib/logger";

let client: Client | null = null;
let botToken: string | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_DELAY_MS = 5 * 60 * 1000; // 5 min cap

// ── Keep-alive self-ping ──────────────────────────────────────────────────────
// Pings own /health endpoint every 4 minutes so Replit never sleeps the container.
let keepAlivePort: number | null = null;

function startKeepAlive(port: number): void {
  keepAlivePort = port;
  setInterval(async () => {
    try {
      await fetch(`http://localhost:${port}/api/healthz`);
      logger.debug("Keep-alive ping OK");
    } catch {
      logger.debug("Keep-alive ping failed (server might be starting)");
    }
  }, 4 * 60 * 1000); // every 4 minutes
}

// ── Discord reconnection watchdog ─────────────────────────────────────────────
// Checks every 30 s that the WS connection is alive. If not, reconnects.
function startWatchdog(): void {
  setInterval(async () => {
    if (!client || !botToken) return;
    const ws = client.ws;
    // Status 0 = READY, anything else means degraded
    if (ws.status !== 0) {
      logger.warn({ wsStatus: ws.status }, "Bot WebSocket not ready — attempting reconnect");
      await reconnect();
    }
  }, 30 * 1000);
}

async function reconnect(): Promise<void> {
  if (!botToken) return;
  reconnectAttempts++;
  const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), MAX_RECONNECT_DELAY_MS);
  logger.info({ attempt: reconnectAttempts, delayMs: delay }, "Reconnecting Discord bot...");
  await new Promise((r) => setTimeout(r, delay));
  try {
    if (client) {
      client.removeAllListeners();
      client.destroy();
    }
    await createAndLoginClient(botToken);
    reconnectAttempts = 0;
    logger.info("Bot reconnected successfully");
  } catch (err) {
    logger.error({ err }, "Reconnection failed, will retry via watchdog");
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function sendChunks(channel: TextChannel, chunks: string[]): Promise<void> {
  for (const chunk of chunks) {
    await channel.send(chunk);
  }
}

async function postDailyRecipeToAll(): Promise<void> {
  if (!client) return;

  const channels = await getActiveChannels();
  if (channels.length === 0) {
    logger.info("No active channels, skipping daily post");
    return;
  }

  const canPost = await shouldPostToday();
  if (!canPost) {
    const day = await getCurrentDay();
    logger.info({ day }, "Already posted today, skipping");
    return;
  }

  const recipe = await fetchFormattedRecipe();
  if (!recipe) {
    logger.error("Failed to fetch recipe for daily post");
    return;
  }

  const day = await getNextDay();
  const chunks = formatDailyRecipe(day, recipe);

  let posted = false;
  for (const channelId of channels) {
    try {
      const ch = await client.channels.fetch(channelId);
      if (!ch || !(ch instanceof TextChannel)) {
        logger.warn({ channelId }, "Channel unavailable, skipping");
        continue;
      }
      await sendChunks(ch, chunks);
      posted = true;
      logger.info({ day, channelId, recipe: recipe.title }, "Daily recipe posted");
    } catch (err) {
      logger.error({ err, channelId }, "Failed to post to channel");
    }
  }

  if (posted) {
    await markPosted(day, recipe.title);
  }
}

// ── Star helpers ──────────────────────────────────────────────────────────────

function starsEmoji(n: number): string {
  const rounded = Math.round(n * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);
  return "⭐".repeat(full) + (half ? "✨" : "") + "☆".repeat(empty);
}

// ── Slash command definitions ─────────────────────────────────────────────────

const commands = [
  {
    name: "hungry",
    description: "🍽️ Activa la receta diaria en este canal (cada día a las 12:00 PM hora España)",
  },
  {
    name: "full",
    description: "🛑 Desactiva la receta diaria en este canal",
  },
  {
    name: "chef",
    description: "👨‍🍳 El chef te prepara una receta aleatoria ahora mismo (incluye versión sin gluten y vegana)",
  },
  {
    name: "chefdaddypls",
    description: "🏆 El chef recrea la receta secreta de una franquicia famosa (KFC, Big Mac, Whopper...)",
    options: [
      {
        name: "franquicia",
        type: ApplicationCommandOptionType.String,
        description: "Nombre de la franquicia (opcional). Ej: KFC, Big Mac, Whopper, Domino's...",
        required: false,
      },
    ],
  },
  {
    name: "cheftop",
    description: "🏆 Muestra el ranking de las recetas mejor valoradas de todos los tiempos",
  },
  {
    name: "actionspizza",
    description: "📋 Muestra todos los comandos disponibles del bot Chef Joseph",
  },
  {
    name: "chefrating",
    description: "⭐ Valora la receta del día de hoy (1-5 estrellas)",
    options: [
      {
        name: "estrellas",
        type: ApplicationCommandOptionType.Integer,
        description: "Tu valoración de 1 a 5 estrellas",
        required: true,
        choices: [
          { name: "⭐ 1 — No me convenció", value: 1 },
          { name: "⭐⭐ 2 — Mejorable", value: 2 },
          { name: "⭐⭐⭐ 3 — Está bien", value: 3 },
          { name: "⭐⭐⭐⭐ 4 — Muy buena", value: 4 },
          { name: "⭐⭐⭐⭐⭐ 5 — ¡Obra maestra!", value: 5 },
        ],
      },
    ],
  },
];

async function registerCommands(token: string, clientId: string): Promise<void> {
  const rest = new REST({ version: "10" }).setToken(token);
  try {
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    logger.info("Slash commands registered: /hungry /full /chef /chefdaddypls /chefrating /cheftop /actionspizza");
  } catch (err) {
    logger.error({ err }, "Failed to register slash commands");
  }
}

// ── Client factory ────────────────────────────────────────────────────────────

async function createAndLoginClient(token: string): Promise<void> {
  client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once("ready", async (c) => {
    logger.info({ tag: c.user.tag }, "Discord bot connected and ready");

    const inviteUrl =
      `https://discord.com/api/oauth2/authorize?client_id=${c.user.id}` +
      `&permissions=3072&scope=bot+applications.commands`;
    logger.info({ inviteUrl }, "Invite URL");

    await registerCommands(token, c.user.id);

    cron.schedule(
      "0 12 * * *",
      async () => {
        logger.info("Cron: posting daily recipe (12:00 PM Spain)");
        await postDailyRecipeToAll();
      },
      { timezone: "Europe/Madrid" },
    );

    logger.info("Bot ready. /hungry to start daily recipes at 12:00 PM Spain.");
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName, channelId } = interaction;

    // ── /hungry ──────────────────────────────────────────────
    if (commandName === "hungry") {
      const added = await addChannel(channelId);
      if (!added) {
        await interaction.reply(
          "✅ **Las recetas diarias ya estaban activas en este canal.**\nCada día a las **12:00 PM (hora España)** recibiréis una receta nueva con versión sin gluten y vegana.",
        );
        return;
      }

      await interaction.reply(
        "🍽️ **¡Recetas diarias activadas en este canal!**\n\n" +
          "Cada día a las **12:00 PM (hora España)** publicaré una receta nueva con:\n" +
          "• 📋 Preparación paso a paso desde cero\n" +
          "• 🌾 Versión sin gluten para celíacos\n" +
          "• 🌱 Versión vegana\n" +
          "• ⚠️ Lista de alérgenos\n\n" +
          "Usa `/full` para desactivarlo cuando quieras.\n" +
          "Usa `/chef` para pedir una receta ahora mismo.\n" +
          "Usa `/chefrating` para valorar la receta del día.",
      );

      try {
        const recipe = await fetchFormattedRecipe();
        if (recipe) {
          const day = await getNextDay();
          const chunks = formatDailyRecipe(day, recipe);
          const ch = interaction.channel;
          if (ch instanceof TextChannel) {
            await sendChunks(ch, chunks);
            await markPosted(day, recipe.title);
          }
        }
      } catch (err) {
        logger.error({ err }, "Failed to post initial recipe after /hungry");
      }
      return;
    }

    // ── /full ─────────────────────────────────────────────────
    if (commandName === "full") {
      const removed = await removeChannel(channelId);
      if (!removed) {
        await interaction.reply(
          "ℹ️ Las recetas diarias no estaban activas en este canal. Usa `/hungry` para activarlas.",
        );
        return;
      }
      await interaction.reply(
        "🛑 **Recetas diarias desactivadas en este canal.**\nPuedes volver a activarlas cuando quieras con `/hungry`.",
      );
      return;
    }

    // ── /chef ─────────────────────────────────────────────────
    if (commandName === "chef") {
      await interaction.deferReply();
      try {
        const recipe = await fetchRandomRecipeOnDemand();
        if (!recipe) {
          await interaction.editReply("❌ No pude obtener una receta ahora mismo. Inténtalo de nuevo.");
          return;
        }
        const chunks = formatOnDemandRecipe(recipe);
        await interaction.editReply(chunks[0]);
        for (let i = 1; i < chunks.length; i++) {
          await interaction.followUp(chunks[i]);
        }
      } catch (err) {
        logger.error({ err }, "Error in /chef command");
        await interaction.editReply("❌ Error al generar la receta. Inténtalo de nuevo.");
      }
      return;
    }

    // ── /chefdaddypls ─────────────────────────────────────────
    if (commandName === "chefdaddypls") {
      const franquicia = interaction.options.getString("franquicia") ?? undefined;
      await interaction.deferReply();
      try {
        const recipe = await fetchFranchiseRecipe(franquicia);
        const chunks = formatFranchiseRecipe(recipe);
        await interaction.editReply(chunks[0]);
        for (let i = 1; i < chunks.length; i++) {
          await interaction.followUp(chunks[i]);
        }
      } catch (err) {
        logger.error({ err }, "Error in /chefdaddypls command");
        await interaction.editReply("❌ Error al generar la receta de franquicia. Inténtalo de nuevo.");
      }
      return;
    }

    // ── /actionspizza ─────────────────────────────────────────
    if (commandName === "actionspizza") {
      await interaction.reply(
        `👨‍🍳 **CHEF JOSEPH — TODOS LOS COMANDOS**\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🍽️ \`/hungry\`\n` +
        `↳ Activa las recetas diarias en este canal. Se publicará una receta cada día a las **12:00 PM (hora España)** con versión sin gluten, vegana y lista de alérgenos. La primera receta se publica de inmediato.\n\n` +
        `🛑 \`/full\`\n` +
        `↳ Desactiva las recetas diarias en este canal. Puedes volver a activarlas con \`/hungry\` cuando quieras.\n\n` +
        `👨‍🍳 \`/chef\`\n` +
        `↳ Pide una receta aleatoria ahora mismo. Incluye preparación paso a paso, versión sin gluten, versión vegana y alérgenos.\n\n` +
        `🏆 \`/chefdaddypls [franquicia]\`\n` +
        `↳ El chef recrea la receta secreta de una franquicia famosa. Disponibles: **KFC, Big Mac, Whopper, Domino's, Pizza Hut, Subway, Five Guys, Taco Bell, Popeyes, Chick-fil-A, Wendy's, Cinnabon, Starbucks, Chipotle, Panda Express, Nando's, In-N-Out, 100 Montaditos, Wingstop, Shake Shack**. Si no pones franquicia, elige una aleatoria.\n\n` +
        `⭐ \`/chefrating [1-5]\`\n` +
        `↳ Valora la receta del día de hoy de 1 a 5 estrellas. Solo puedes votar una vez por receta.\n\n` +
        `📊 \`/cheftop\`\n` +
        `↳ Muestra el ranking de las recetas mejor valoradas de todos los tiempos con su media y número de votos.\n\n` +
        `📋 \`/actionspizza\`\n` +
        `↳ Muestra este menú de comandos.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `*¡Buen provecho! 🍴*`,
      );
      return;
    }

    // ── /cheftop ──────────────────────────────────────────────
    if (commandName === "cheftop") {
      try {
        const top = await getTopRatedRecipesWithTitles(10);
        if (top.length === 0) {
          await interaction.reply(
            "📊 **Aún no hay valoraciones registradas.**\n\n" +
            "Usa `/chefrating` después de cada receta del día para construir el ranking. ¡Sé el primero!",
          );
          return;
        }

        const medals = ["🥇", "🥈", "🥉"];
        const lines = top.map((entry, i) => {
          const medal = medals[i] ?? `**${i + 1}.**`;
          const stars = starsEmoji(entry.average);
          const avg = entry.average.toFixed(1);
          const votes = `*(${entry.count} ${entry.count === 1 ? "voto" : "votos"})*`;
          return `${medal} **${entry.title}** — ${stars} **${avg}/5** ${votes}`;
        });

        await interaction.reply(
          `🏆 **RANKING DE RECETAS MEJOR VALORADAS** 🏆\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          lines.join("\n") +
          `\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📊 *Total de recetas valoradas: ${top.length}*\n` +
          `⭐ *Usa /chefrating después de cada receta para votar*`,
        );
      } catch (err) {
        logger.error({ err }, "Error in /cheftop command");
        await interaction.reply({ content: "❌ Error al obtener el ranking.", ephemeral: true });
      }
      return;
    }

    // ── /chefrating ───────────────────────────────────────────
    if (commandName === "chefrating") {
      const stars = interaction.options.getInteger("estrellas", true);
      try {
        const result = await addRating(interaction.user.id, stars);

        if (result.alreadyVoted) {
          const avg = result.average.toFixed(1);
          await interaction.reply({
            content:
              `ℹ️ **Ya has valorado la receta de hoy.**\n\n` +
              `📖 *${result.recipeTitle ?? `Día ${result.day}`}*\n` +
              `Media actual: **${avg}/5** ${starsEmoji(result.average)} *(${result.count} ${result.count === 1 ? "voto" : "votos"})*`,
            ephemeral: true,
          });
          return;
        }

        const avg = result.average.toFixed(1);
        const starLine = "⭐".repeat(stars) + "☆".repeat(5 - stars);
        const reactions: Record<number, string> = {
          1: "😬 Entendido, le daremos una vuelta...",
          2: "😐 Gracias por el feedback.",
          3: "🙂 ¡Bien! Seguimos cocinando.",
          4: "😄 ¡Excelente! Me alegra que te haya gustado.",
          5: "🤩 ¡Perfecto! El chef está encantado.",
        };

        await interaction.reply(
          `${starLine} **¡Voto registrado! Gracias, ${interaction.user.displayName}!**\n\n` +
          `📖 *${result.recipeTitle ?? `Receta del día ${result.day}`}*\n` +
          `Tu puntuación: **${stars}/5**\n` +
          `Media actual: **${avg}/5** ${starsEmoji(result.average)} *(${result.count} ${result.count === 1 ? "voto" : "votos"})*\n\n` +
          `${reactions[stars] ?? ""}`,
        );
      } catch (err) {
        logger.error({ err }, "Error in /chefrating command");
        await interaction.reply({ content: "❌ Error al registrar la valoración.", ephemeral: true });
      }
      return;
    }
  });

  client.on("warn", (info) => logger.warn({ info }, "Discord client warning"));
  client.on("error", (err) => logger.error({ err }, "Discord client error"));

  client.on("shardDisconnect", (event, shardId) => {
    logger.warn({ code: event.code, shardId }, "Discord shard disconnected");
  });

  client.on("shardReconnecting", (shardId) => {
    logger.info({ shardId }, "Discord shard reconnecting...");
  });

  client.on("shardResume", (shardId, replayedEvents) => {
    logger.info({ shardId, replayedEvents }, "Discord shard resumed");
    reconnectAttempts = 0;
  });

  await client.login(token);
}

// ── Entry point ───────────────────────────────────────────────────────────────

export async function startDiscordBot(port?: number): Promise<void> {
  const token = process.env["DISCORD_BOT_TOKEN"];
  if (!token) {
    logger.warn("DISCORD_BOT_TOKEN not set — Discord bot will not start");
    return;
  }

  botToken = token;

  if (port) startKeepAlive(port);
  startWatchdog();

  try {
    await createAndLoginClient(token);
  } catch (err) {
    logger.error({ err }, "Failed to login — check DISCORD_BOT_TOKEN");
  }
}
