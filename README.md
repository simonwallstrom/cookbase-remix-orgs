# Cookbase

Cookbase is a recipe organizer and meal planner for families.

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

If making changes to the database schema, run:

```sh
npx prisma db push
```

_This will update the local Postgres db to reflect the prisma schema file._

## Access remote database via proxy

Open a separate terminal tab and run:

```sh
flyctl proxy 15432:5432 -a <fly-db-name>
```

## Deployment

If you've made any changes to the Prisma schema, remember to create a migration file by running:

```sh
npx prisma migrate dev
```

Then to deploy run:

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.
