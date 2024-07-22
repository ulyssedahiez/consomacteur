import { Router } from "express";
import { deleteSensor, getSensor, updateSensor } from "../controllers/sensorController.js";
import { getSensorById } from "../middlewares/sensorMiddleware.js";
import { createSensorMeasurement, getSensorMeasurements } from "../controllers/measurementController.js";

const sensorRoutes = Router();
sensorRoutes.get("/:sensorId", getSensorById, getSensor);
sensorRoutes.patch("/:sensorId", getSensorById, updateSensor);
sensorRoutes.delete("/:sensorId", getSensorById, deleteSensor);

const sensorMeasurementRoutes = Router();
sensorMeasurementRoutes.post('/', createSensorMeasurement);
sensorMeasurementRoutes.get('/', getSensorMeasurements);
sensorRoutes.use('/:sensorId/measurements', getSensorById, sensorMeasurementRoutes);

export default sensorRoutes;
