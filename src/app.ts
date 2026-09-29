import Fastify from "fastify";
import { pool } from "./db";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.get("/health", async (request, reply) => {
    try {
      await pool.query("SELECT 1");
      return { status: "ok", database: "up" };
    } catch (error) {
      request.log.error({ err: error }, "database health check failed");
      return reply.code(503).send({ status: "degraded", database: "down" });
    }
  });

  return app;
}
