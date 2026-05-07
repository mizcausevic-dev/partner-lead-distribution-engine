import { Router } from "express";
import { routingRules } from "../services/routingService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(routingRules);
});

export default router;
