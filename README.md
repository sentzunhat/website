# sentzunhat website

Small public landing page for the sentzunhat project family.

## Stack

- React with Vite
- Tailwind CSS
- Express API
- Sequelize with SQLite
- Node `26.10.0`

The release cards are seeded by `server/index.js` and the frontend keeps a small fallback so the landing page remains useful when the local API is unavailable.

## Development

```bash
nvm use
npm install
npm run dev
```

Open `http://localhost:5173`.

## Checks

```bash
npm run build
npm run lint
```
