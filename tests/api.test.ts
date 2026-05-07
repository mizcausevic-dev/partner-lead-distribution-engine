import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns 200", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "Partner Lead Distribution Engine");
});

test("GET /api/leads returns an array", async () => {
  const response = await request(app).get("/api/leads");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 1);
});

test("POST /api/analyze/routing returns score and status", async () => {
  const response = await request(app).post("/api/analyze/routing").send({
    companyName: "Northstar Cloud",
    region: "North America",
    industry: "Cloud Infrastructure",
    companySize: 1200,
    leadSource: "partner-webinar",
    productLine: "Platform Modernization",
    slaHoursRemaining: 6,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.score, "number");
  assert.equal(typeof response.body.status, "string");
});

test("GET /api/partners returns an array", async () => {
  const response = await request(app).get("/api/partners");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test("POST /api/analyze/attribution returns recommended next-step output", async () => {
  const response = await request(app).post("/api/analyze/attribution").send({
    companyName: "Northstar Cloud",
    region: "North America",
    industry: "Cloud Infrastructure",
    companySize: 1200,
    leadSource: "partner-webinar",
    productLine: "Platform Modernization",
    slaHoursRemaining: 6,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.priority, "string");
  assert.equal(typeof response.body.recommendedNextAction, "string");
});
