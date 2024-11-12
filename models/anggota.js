import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";
import db from "../utils/supabaseClient";

const Anggota = db.define("anggota", {
  id_anggota: {
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
  nama_lengkap: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jabatan: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nomor_anggota: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nomor_telp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  angkatan: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  alamat: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  instagram: {
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

export default Anggota;
