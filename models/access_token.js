import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";
import db from "../utils/db.js";

const Access = db.define("access_tokens", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_users: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  access_token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ip_address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

db.sync({ alter: true })
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

export default Access;
