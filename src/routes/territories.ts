import { Router } from "express";
import { territories } from "../services/routingService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(territories);
});

export default router;
