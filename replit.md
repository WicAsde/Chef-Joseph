# Bot Chef de Discord

Bot de Discord que publica recetas diarias paso a paso con versiones para celíacos, veganos y lista de alérgenos. Incluye comandos para activar/desactivar la suscripción diaria y pedir recetas al momento.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — ejecutar el servidor + bot de Discord (puerto 5000)
- `pnpm run typecheck` — verificación de tipos en todos los paquetes
- `pnpm run build` — typecheck + build completo
- Required env secrets: `DISCORD_BOT_TOKEN`, `DISCORD_CHANNEL_ID` (ya no usado — se usa /hungry)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- Bot: discord.js v14
- Scheduler: node-cron (timezone Europe/Madrid)
- Recetas: TheMealDB API (gratuita, sin API key)
- Build: esbuild (CJS bundle)

## Comandos del Bot

| Comando | Descripción |
|---------|-------------|
| `/hungry` | Activa recetas diarias en el canal donde se usa (12:00 PM España). Publica la primera receta de inmediato. |
| `/full` | Desactiva las recetas diarias en ese canal |
| `/chef` | Pide una receta aleatoria ahora mismo |
| `/chefdaddypls [franquicia]` | Receta recreada de franquicia (KFC, Big Mac, Whopper, Domino's, Subway, Five Guys, Taco Bell, Popeyes, Chick-fil-A, Wendy's, Cinnabon, Starbucks, Chipotle, Panda Express, Nando's, In-N-Out, 100 Montaditos, Wingstop, Shake Shack...) |

## Where things live

- `artifacts/api-server/src/bot/discord-bot.ts` — lógica principal del bot, comandos slash
- `artifacts/api-server/src/bot/recipe-service.ts` — obtención y formateo de recetas, variantes celíacos/veganos
- `artifacts/api-server/src/bot/day-tracker.ts` — contador de días y canales activos
- `artifacts/api-server/data/bot-state.json` — estado persistente (día actual, canales activos)

## Architecture decisions

- El bot corre dentro del mismo proceso que el servidor Express para simplificar el despliegue en un solo workflow.
- Los canales activos se guardan en un JSON local (`data/bot-state.json`) sin base de datos para mantenerlo simple.
- Las variantes celíacos/veganos se generan automáticamente por sustitución de ingredientes sin necesidad de IA.
- `discord.js` está externalizado en esbuild (no bundleado) para evitar problemas con sus dependencias nativas.
- Se usa `node-cron` con `timezone: "Europe/Madrid"` para manejar correctamente CET/CEST sin cálculos manuales.

## Product

Bot de Discord "Chef Joseph" que publica recetas diarias a las 12:00 PM hora española. Cada receta incluye: preparación paso a paso desde cero, versión sin gluten para celíacos, versión vegana, y lista de alérgenos. Los usuarios activan la suscripción con `/hungry` en cualquier canal y la detienen con `/full`.

## User preferences

- Recetas en español con formato paso a paso detallado
- Publicación diaria a las 12:00 PM hora España (Europe/Madrid)
- Incluir variantes: normal, sin gluten (celíacos), vegana, alérgenos
- Comandos: /hungry (activar), /full (desactivar), /chef (receta ahora), /chefspecial (franquicia)

## Gotchas

- El bot necesita permiso `applications.commands` además de `bot` para los slash commands. URL de invitación correcta en los logs.
- Los slash commands globales tardan hasta 1 hora en propagarse en Discord. Los de servidor (guild) son instantáneos.
- `data/bot-state.json` se crea automáticamente en el directorio del artifact.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
