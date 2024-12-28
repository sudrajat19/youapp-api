import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";
import db from "../utils/db.js";

const Profile = db.define("profile", {
  id_profile: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_users: {
    type: Sequelize.INTEGER,
    allowNull: false,
    index: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthday: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  height: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  horoscope: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  zodiac: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  photo: {
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

export default Profile;
