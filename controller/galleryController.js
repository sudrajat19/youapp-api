import fs from "fs";
import sequelize from "../utils/db.js";
import { QueryTypes } from "sequelize";
import GalleryModel from "../models/gallery.js"; // Renamed to avoid shadowing
import { validationResult } from "express-validator";

export const getGallery = async (req, res) => {
  try {
    const data = await GalleryModel.findAll();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getGalleryByAlbum = async (req, res) => {
  const { id_albums } = req.params;
  try {
    const data = await sequelize.query(
      `SELECT * FROM galleries WHERE galleries.id_albums = :id_albums`,
      {
        replacements: { id_albums },
        type: QueryTypes.SELECT,
      }
    );
    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getGalleryById = async (req, res) => {
  const { id_gallery } = req.params;
  try {
    const data = await GalleryModel.findByPk(id_gallery);
    if (!data) {
      return res.status(404).json({ message: "Gallery tidak ditemukan" });
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const addGallery = async (req, res) => {
  let gambar = req.file ? "images/" + req.file.filename : null;
  const deskripsi = req.body.deskripsi;
  const id_albums = req.body.id_albums;

  if (!gambar) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newGallery = await GalleryModel.create({
      gambar,
      deskripsi,
      id_albums,
    });
    res.status(201).json({
      message: "Gallery berhasil ditambahkan",
      data: newGallery,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Gagal menambahkan Gallery",
      error: err.message,
    });
  }
};

export const updateGallery = async (req, res) => {
  const { id_gallery } = req.params; // Added this line
  const deskripsi = req.body.deskripsi;
  const id_albums = req.body.id_albums;
  let gambar = req.file ? "images/" + req.file.filename : null;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gallery = await GalleryModel.findByPk(id_gallery);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery tidak ditemukan" });
    }

    if (gambar && gallery.gambar) {
      fs.unlink(gallery.gambar, (err) => {
        if (err) console.log("Gagal menghapus file: ", err);
      });
    }

    await gallery.update({ gambar, deskripsi, id_albums });

    res.status(200).json({
      message: "Gallery berhasil diupdate",
      data: gallery,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Gagal update Gallery",
      error: err.message,
    });
  }
};

export const deleteGallery = async (req, res) => {
  const { id_gallery } = req.params;
  try {
    const gallery = await GalleryModel.findOne({ where: { id_gallery } });
    if (!gallery) {
      return res.status(404).json({ message: "Gallery tidak ditemukan" });
    }

    if (gallery.gambar) {
      fs.unlink(gallery.gambar, (err) => {
        if (err) console.log("Gagal menghapus file: ", err);
      });
    }

    await gallery.destroy(); // Use the instance to destroy

    res.status(200).json({ message: "Gallery berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Gagal menghapus Gallery",
      error: err.message,
    });
  }
};
