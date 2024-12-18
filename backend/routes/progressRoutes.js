import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getProgress, completeTask } from "../controllers/progressController.js";

const router = express.Router();

// Get progress for the authenticated user
router.get("/", authenticateToken, getProgress);

// Mark a task as complete for the authenticated user
router.post("/:id/complete-task", authenticateToken, completeTask);

export default router;
