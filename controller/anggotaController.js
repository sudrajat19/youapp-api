import fs from "fs";
import Anggota from "../models/anggota.js";

import { QueryTypes } from "sequelize";
import sequelize from "../utils/supabaseClient.js";
import { validationResult } from "express-validator";

export const getAnggota = async (req, res) => {
  try {
    const data = await Anggota.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const getAnggotaById = async (req, res) => {
  const id_anggota = req.params.id_anggota;
  try {
    const data = await Anggota.findByPk(id_anggota);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

export const addAnggota = async (req, res) => {
  const nama_lengkap = req.body.nama_lengkap;
  const jabatan = req.body.jabatan;
  const nomor_anggota = req.body.nomor_anggota;
  const nomor_telp = req.body.nomor_telp;
  const angkatan = req.body.angkatan;
  const alamat = req.body.alamat;
  const instagram = req.body.instagram;
  let photo = req.file ? "images/" + req.file.filename : null;
  const id_users = req.body.id_users;
  console.log(req.body);

  if (
    !nama_lengkap ||
    !jabatan ||
    !nomor_anggota ||
    !instagram ||
    !alamat ||
    !angkatan ||
    !nomor_telp
  ) {
    return res.status(400).json({
      message: "Semua field harus diisi",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newAnggota = await Anggota.create({
      nama_lengkap,
      jabatan,
      nomor_anggota,
      nomor_telp,
      angkatan,
      photo,
      instagram,
      alamat,
      id_users,
    });

    res.status(201).json({
      message: "Anggota berhasil ditambahkan",
      data: newAnggota,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal menambahkan Anggota",
      error: err.message,
    });
  }
};

export const updateAnggota = async (req, res) => {
  const id_users = req.params.id_users;
  const {
    nama_lengkap,
    jabatan,
    nomor_anggota,
    nomor_telp,
    angkatan,
    alamat,
    instagram,
  } = req.body;
  const photo = req.file ? "images/" + req.file.filename : null;

  console.log(req.body);

  try {
    // Ambil data anggota yang ada
    const data = await sequelize.query(
      `SELECT * FROM anggota 
       JOIN users ON anggota.id_users = users.id_users 
       WHERE users.id_users = :id_users`,
      {
        replacements: { id_users },
        type: QueryTypes.SELECT,
      }
    );

    // Jika anggota tidak ditemukan
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Anggota tidak ditemukan" });
    }

    // Jika ada gambar baru dan gambar lama ada, hapus gambar lama
    if (photo && data[0].photo) {
      fs.unlink(data[0].photo, (err) => {
        if (err) console.log("Gagal menghapus file: ", err);
      });
    }

    // Jika tidak ada gambar baru, gunakan gambar lama
    const updatedData = {
      nama_lengkap,
      jabatan,
      nomor_anggota,
      nomor_telp,
      angkatan,
      instagram,
      alamat,
      id_users,
      photo: photo || data[0].photo, // Jika photo null, gunakan gambar lama
    };

    // Update anggota
    await Anggota.update(updatedData, {
      where: { id_anggota: data[0].id_anggota }, // Ganti dengan ID yang sesuai
    });

    res.status(200).json({
      message: "Anggota berhasil diupdate",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal update Anggota",
      error: error.message,
    });
  }
};

export const deleteanggota = async (req, res) => {
  const id_anggota = req.params.id_anggota;
  try {
    const Anggota = await Anggota.findOne({ where: { id_anggota } });
    if (!Anggota) {
      return res.status(404).json({
        message: "Anggota tidak ditemukan",
      });
    }
    if (photo && Anggota.photo) {
      fs.unlink(Anggota.photo, (err) => {
        if (err) console.log("Gagal menghapus file: ", err);
      });
    }
    await Anggota.destroy({
      where: { id_anggota },
    });
    res.status(201).json({
      message: "Anggota berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal menghapus Anggota",
      error: err.message,
    });
  }
};
