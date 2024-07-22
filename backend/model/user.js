import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    indexes: [{ unique: true, fields: ["email"] }],
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
