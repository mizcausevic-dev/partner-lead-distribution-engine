import { Router } from "express";
import { leads } from "../services/routingService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(leads);
});

router.get("/:id", (request, response) => {
  const lead = leads.find((entry) => entry.id === request.params.id);

  if (!lead) {
    return response.status(404).json({
      error: "Not Found",
      message: "Lead was not found.",
    });
  }

  return response.json(lead);
});

export default router;
