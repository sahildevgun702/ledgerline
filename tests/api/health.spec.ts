import { expect, test } from "@playwright/test";
//comment to be removed
test("health check reports everything is up", async ({ request }) => {
  const response = await request.get("/health");

  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ status: "ok", database: "up" });
});

test("unknown routes return 404", async ({ request }) => {
  const response = await request.get("/does-not-exist");

  expect(response.status()).toBe(404);
});
