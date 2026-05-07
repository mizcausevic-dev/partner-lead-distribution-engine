import { Router } from "express";
import { distributionEvents } from "../services/routingService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(distributionEvents);
});

export default router;
