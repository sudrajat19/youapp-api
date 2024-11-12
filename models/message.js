// models/messageModel.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js"; // Pastikan Anda mengimpor instance sequelize

const Message = sequelize.define(
  "Message",
  {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Message;
