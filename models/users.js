import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";
import db from "../utils/supabaseClient.js";
import Anggota from "./anggota.js";

const User = db.define("User", {
  id_users: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nama: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
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

User.hasOne(Anggota, {
  foreignKey: "id_users",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Anggota.belongsTo(User, {
  foreignKey: "id_users",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

db.sync({ alter: true })
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

export default User;
