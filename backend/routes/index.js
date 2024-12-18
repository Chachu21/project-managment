import express from "express";
import authRoutes from "./userRoutes.js";
import projectRoutes from "./productRoutes.js";
import progressRoutes from "./progressRoutes.js";
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/progress", progressRoutes);
export default router;
