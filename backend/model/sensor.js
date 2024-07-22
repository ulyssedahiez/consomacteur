import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Sensor = sequelize.define("Sensor", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Sensor;
