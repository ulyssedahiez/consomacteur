import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Scenario = sequelize.define("Scenario", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["started", "paused", "stopped"]],
    },
    defaultValue: "stopped",
  },
  startedAt: {
    type: DataTypes.DATE,
  }
});

export default Scenario;
