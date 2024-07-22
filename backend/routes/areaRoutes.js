import { Router } from "express";
import { getAreaById } from "../middlewares/areaMiddleware.js";
import {
  updateArea,
  deleteArea,
  createSubArea,
  getSubAreas,
  getArea,
} from "../controllers/areaController.js";
import { createAreaSensor, getAreaSensors } from "../controllers/sensorController.js";

const areaRoutes = Router();
areaRoutes.get('/:areaId', getAreaById, getArea);
areaRoutes.patch('/:areaId', getAreaById, updateArea);
areaRoutes.delete('/:areaId', getAreaById, deleteArea);

const subAreaRoutes = Router();
subAreaRoutes.get("/", getSubAreas);
subAreaRoutes.post("/", createSubArea);
areaRoutes.use("/:areaId/subareas", getAreaById, subAreaRoutes);

const areaSensorRoutes = Router();
areaSensorRoutes.get("/", getAreaSensors);
areaSensorRoutes.post("/", createAreaSensor);
areaRoutes.use("/:areaId/sensors", getAreaById, areaSensorRoutes);

export default areaRoutes;
