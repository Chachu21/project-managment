import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getProjects,
  createProject,
  acceptProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Get all projects
router.get("/", authenticateToken, getProjects);

// Create a new project
router.post("/", authenticateToken, createProject);

// Accept a project
router.post("/:id/accept", authenticateToken, acceptProject);

export default router;
