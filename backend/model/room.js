import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Room = sequelize.define("Room", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

export default Room;
