import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Area = sequelize.define("area", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Area;
