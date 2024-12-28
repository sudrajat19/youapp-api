import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";
import db from "../utils/db.js";
const Interest = db.define("interest", {
  id_interest: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_users: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  interest: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
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

export default Interest;
