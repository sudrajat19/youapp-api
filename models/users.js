import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";
import db from "../utils/db.js";
import Profile from "./profile.js";
import Interest from "./interest.js";
import Access from "./access_token.js";

const User = db.define("User", {
  id_users: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
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

User.hasOne(Profile, {
  foreignKey: "id_users",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Profile.belongsTo(User, {
  foreignKey: "id_users",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

User.hasMany(Interest, {
  foreignKey: "id_users",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Interest.belongsTo(User, {
  foreignKey: "id_users",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
User.hasOne(Access, {
  foreignKey: "id_users",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Access.belongsTo(User, {
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
