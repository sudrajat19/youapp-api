import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";
import db from "../utils/supabaseClient";

const Gallery = db.define("gallery", {
  id_gallery: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  gambar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: Sequelize.STRING,
    allowNull: true,
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

export default Gallery;
