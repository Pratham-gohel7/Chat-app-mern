import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRouter from "../middleware/protectRouter.js";

const router = express.Router();

router.post("/send/:id", protectRouter, sendMessage);
router.get("/:id", protectRouter, getMessages);

export default router;