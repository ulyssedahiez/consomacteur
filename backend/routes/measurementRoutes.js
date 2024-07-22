import { Router } from "express";
import { deleteMeasurement, getMeasurement, updateMeasurement } from "../controllers/measurementController.js";
import { getMeasurementById } from "../middlewares/measurementMiddleware.js";

const measurementRoutes = Router();
measurementRoutes.get("/:measurementId", getMeasurementById, getMeasurement);
measurementRoutes.patch("/:measurementId", getMeasurementById, updateMeasurement);
measurementRoutes.delete("/:measurementId", getMeasurementById, deleteMeasurement);

export default measurementRoutes;
