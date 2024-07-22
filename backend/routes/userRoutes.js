import { Router } from "express";
import { getUserProfile } from "../controllers/userController.js";

const userRoutes = Router();
userRoutes.get("/profile", getUserProfile);

export default userRoutes;
