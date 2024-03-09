# Conversia Contact Book - Backend

## Requirements

-   NodeJs
-   Npm
-   PostsgreSQL

## How to run

1. Install dependencies.

```bash
npm install
```

2. Generate prisma code.
```bash
npm run prisma:generate
```
3. Create a `.env`based on `.env.example`

4. Execute server.
```bash
npm run dev
```

## Migration
To migrate the schema into your database, you need to execute.
```bash
npm run prisma:migrate
```
It's important to have the .env file before doing the migration.