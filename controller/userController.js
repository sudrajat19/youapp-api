import Users from "../models/users.js";
import Access from "../models/access_token.js";
import jwt from "jsonwebtoken";
import { config } from "../config/secret.js";
import ip from "ip";
import { QueryTypes } from "sequelize";
import sequelize from "../utils/db.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const login = async function (req, res) {
  const { email, password } = req.body;
  console.log(email, "ini email", password, "ini password");
  try {
    const users = await Users.findOne({ where: { email } });
    if (!users) {
      return res.status(400).json({ message: "Email atau password salah!" });
    }

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email atau password salah!" });
    }

    const token = jwt.sign({ id: users.id_users }, config.secret, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(
      { id: users.id_users },
      config.refreshSecret,
      {
        expiresIn: "7d",
      }
    );

    await Access.create({
      id_users: users.id_users,
      access_token: token,
      refresh_token: refreshToken,
      ip_address: ip.address(),
    });

    res.json({
      success: true,
      message: "Token JWT tergenerate!",
      accessToken: token,
      refreshToken: refreshToken,
      currUser: users.id_users,
    });
  } catch (err) {
    console.error("Error creating access token:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  const id_users = req.params.id_users;
  try {
    const data = await Users.findByPk(id_users);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const addUsers = async (req, res) => {
  const saltRounds = 10;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Semua field harus diisi",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User berhasil ditambahkan",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal menambahkan user",
      error: err.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  const saltRounds = 10;
  const id_users = req.params.id_users;
  const password = req.body.password;
  Users.findByPk(id_users)
    .then((data) => {
      if (data) {
        console.log(data.toJSON());
      } else {
        console.log("user tidak ditemukan");
      }
    })
    .catch((err) => {
      console.error("terjadi kesalahan:", err, res);
    });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!password) {
    return res.status(400).json({
      message: "Semua field harus diisi",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await Users.update(
      {
        password: hashedPassword,
      },
      {
        where: { id_users: id_users },
      }
    );

    res.status(201).json({
      message: "User berhasil diupdate",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal update user",
      error: err.message,
    });
  }
};
export const updateUsers = async (req, res) => {
  const saltRounds = 10;
  const id_users = req.params.id_users;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  Users.findByPk(id_users)
    .then((data) => {
      if (data) {
        console.log(data.toJSON());
      } else {
        console.log("user tidak ditemukan");
      }
    })
    .catch((err) => {
      console.error("terjadi kesalahan:", err, res);
    });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Semua field harus diisi",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await Users.update(
      {
        username,
        email,
        password: hashedPassword,
      },
      {
        where: { id_users: id_users },
      }
    );

    res.status(201).json({
      message: "User berhasil diupdate",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal update user",
      error: err.message,
    });
  }
};

export const deleteUsers = async (req, res) => {
  const id_users = req.params.id_users;
  try {
    const user = await Users.findOne({ where: { id_users } });
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }
    await Users.destroy({
      where: { id_users },
    });
    res.status(201).json({
      message: "User berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal menghapus user",
      error: err.message,
    });
  }
};
