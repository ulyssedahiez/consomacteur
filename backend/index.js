import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cron from "node-cron";
import { sequelize, connectToDb } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import { requireAuth } from "./controllers/authController.js";
import houseRoutes from "./routes/houseRoutes.js";
import subAreaRoutes from "./routes/areaRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import scenarioRoutes from "./routes/scenarioRoutes.js";
import stepRoutes from "./routes/stepRoutes.js";
import { scenariosExecution } from "./cron/scenario.js";

const app = express();
app.use(cors());

await connectToDb();
await sequelize.sync({
  // force: true,
  // alter: true,
});

app.use(express.json());

cron.schedule("*/10 * * * * *", () => {
  console.log("cron...");
  scenariosExecution();
});

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/secured", requireAuth, (req, res) => {
  res.json("Hello World! -- Secured --");
});

app.use("/auth", authRoutes);

app.use("/user", requireAuth, userRoutes);

app.use("/houses", requireAuth, houseRoutes);

app.use("/areas", requireAuth, subAreaRoutes);

app.use("/sensors", requireAuth, sensorRoutes);

app.use("/scenarios", requireAuth, scenarioRoutes);

app.use("/steps", requireAuth, stepRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
