import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const House = sequelize.define("house", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    }
  },
});

export default House;
