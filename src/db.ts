import { Pool } from "pg";

// Where the database lives. Locally this points at the Docker container;
// in CI or production it comes from the DATABASE_URL environment variable.
export const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgres://ledgerline:ledgerline@localhost:5432/ledgerline";

// A pool keeps a few database connections open and lends them out per query.
export const pool = new Pool({
  connectionString: DATABASE_URL,
  connectionTimeoutMillis: 2000,
});

// If the database drops an idle connection (restart, network blip), pg emits an
// "error" event. Without this listener Node treats it as unhandled and crashes.
pool.on("error", (error) => {
  console.error("Idle database connection error:", error.message);
});
