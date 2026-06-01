import app from "./app";
import { logger } from "./lib/logger";
import { startDiscordBot } from "./bot/discord-bot";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});

// Pass the port so the bot can self-ping /health to stay alive 24/7
startDiscordBot(port).catch((err) => {
  logger.error({ err }, "Failed to start Discord bot");
});
