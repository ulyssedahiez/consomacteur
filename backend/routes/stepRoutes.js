import { Router } from "express";
import { deleteStep, getStep, updateStep } from "../controllers/stepController.js";
import { getStepById } from "../middlewares/stepMiddleware.js";

const stepRoutes = Router();
stepRoutes.patch("/:stepId", getStepById, updateStep);
stepRoutes.delete("/:stepId", getStepById, deleteStep);
stepRoutes.get("/:stepId", getStepById, getStep);

export default stepRoutes;
