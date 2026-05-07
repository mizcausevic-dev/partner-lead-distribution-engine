import { Router } from "express";
import { partners } from "../services/routingService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(partners);
});

export default router;
