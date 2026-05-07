import { Router } from "express";
import { z } from "zod";
import {
  analyzeAttribution,
  analyzeCapacity,
  analyzeRouting,
} from "../services/routingService.js";

const router = Router();

const analysisSchema = z.object({
  companyName: z.string().min(2),
  region: z.enum(["North America", "EMEA", "APAC"]),
  industry: z.string().min(2),
  companySize: z.number().int().positive(),
  leadSource: z.enum(["partner-webinar", "partner-referral", "field-event", "website"]),
  productLine: z.string().min(2),
  slaHoursRemaining: z.number().int().nonnegative(),
});

router.post("/analyze/routing", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeRouting(input));
});

router.post("/analyze/capacity", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeCapacity(input));
});

router.post("/analyze/attribution", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeAttribution(input));
});

export default router;
