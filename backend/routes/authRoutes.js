import { Router } from "express";
import {
  register,
  login,
  requireAuth,
  logout,
} from "../controllers/authController.js";

const authRoutes = Router();
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", requireAuth, logout);

export default authRoutes;
