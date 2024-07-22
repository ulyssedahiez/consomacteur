import { Router } from "express";
import {
  createHouse,
  deleteHouse,
  getHouse,
  getHouses,
  updateHouse,
} from "../controllers/houseController.js";
import { createHouseArea, getHouseAreas } from "../controllers/areaController.js";
import { getHouseById } from "../middlewares/houseMiddleware.js";

const houseRoutes = Router();
houseRoutes.get("/", getHouses);
houseRoutes.post("/", createHouse);
houseRoutes.get("/:houseId", getHouseById, getHouse);
houseRoutes.patch("/:houseId", getHouseById, updateHouse);
houseRoutes.delete("/:houseId", getHouseById, deleteHouse);

const houseAreaRoutes = Router();
houseAreaRoutes.get("/", getHouseAreas);
houseAreaRoutes.post("/", createHouseArea);
houseRoutes.use("/:houseId/areas", getHouseById, houseAreaRoutes);

export default houseRoutes;
