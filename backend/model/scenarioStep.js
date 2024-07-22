import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const ScenarioStep = sequelize.define("ScenarioStep", {
  executedAt: {
    type: DataTypes.DATE,
  },
  executionSecondDelay: {
    type: DataTypes.INTEGER,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default ScenarioStep;
