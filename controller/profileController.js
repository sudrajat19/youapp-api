import fs from "fs";
import Profile from "../models/profile.js";

import { QueryTypes } from "sequelize";
import sequelize from "../utils/db.js";
import { validationResult } from "express-validator";

export const getProfile = async (req, res) => {
  try {
    const data = await Profile.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const getProfileById = async (req, res) => {
  const id_users = req.params.id_users;
  console.log(id_users, "check id");
  try {
    const data = await sequelize.query(
      `SELECT * FROM profiles
       WHERE profiles.id_users = :id_users`,
      {
        replacements: { id_users },
        type: QueryTypes.SELECT,
      }
    );
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const addProfile = async (req, res) => {
  const name = req.body.name;
  const birthday = req.body.birthday;
  const height = req.body.height;
  const weight = req.body.weight;
  const gender = req.body.gender;
  const horoscope = req.body.horoscope;
  const zodiac = req.body.zodiac;
  let photo = req.file ? "images/" + req.file.filename : null;
  const id_users = req.body.id_users;
  console.log(req.body);
  console.log(photo);

  if (!name || !birthday || !height || !weight) {
    return res.status(400).json({
      message: "Semua field harus diisi",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newprofile = await Profile.create({
      name,
      birthday,
      height,
      weight,
      gender,
      horoscope,
      zodiac,
      photo,
      id_users,
    });

    res.status(201).json({
      message: "profile berhasil ditambahkan",
      data: newprofile,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal menambahkan profile",
      error: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  const id_users = req.params.id_users;
  const { name, birthday, height, weight, gender, horoscope, zodiac } =
    req.body;
  const photo = req.file ? "images/" + req.file.filename : null;

  try {
    const data = await sequelize.query(
      `SELECT * FROM profiles 
       LEFT JOIN users ON profiles.id_users = users.id_users 
       WHERE users.id_users = :id_users`,
      {
        replacements: { id_users },
        type: QueryTypes.SELECT,
      }
    );

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "profile tidak ditemukan" });
    }

    if (photo && data[0].photo) {
      fs.unlink(data[0].photo, (err) => {
        if (err) console.log("Gagal menghapus file: ", err);
      });
    }

    const updatedData = {
      name,
      birthday,
      height,
      weight,
      gender,
      horoscope,
      zodiac,
      id_users,
      photo: photo || data[0].photo,
    };

    await Profile.update(updatedData, {
      where: { id_profile: data[0].id_profile },
    });

    res.status(200).json({
      message: "profile berhasil diupdate",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal update profile",
      error: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  const id_profile = req.params.id_profile;
  try {
    const profile = await Profile.findOne({ where: { id_profile } });
    if (!profile) {
      return res.status(404).json({
        message: "profile tidak ditemukan",
      });
    }
    if (photo && profile.photo) {
      fs.unlink(profile.photo, (err) => {
        if (err) console.log("Gagal menghapus file: ", err);
      });
    }
    await Profile.destroy({
      where: { id_profile },
    });
    res.status(201).json({
      message: "profile berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal menghapus profile",
      error: err.message,
    });
  }
};
