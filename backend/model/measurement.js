import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Measurement = sequelize.define("Measurement", {
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
    },
  type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isIn: [['state', 'consumption']],
      },
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});

export default Measurement;
