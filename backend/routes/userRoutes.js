import express from "express";
import {
  registerUser,
  loginUser,
  fetchUsers,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", fetchUsers);

export default router;
