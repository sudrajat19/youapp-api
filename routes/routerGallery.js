import express from "express";
import {
  addGallery,
  deleteGallery,
  getGallery,
  getGalleryById,
  updateGallery,
} from "../controller/galleryController.js";
import upload from "../upload.js";

const router = express.Router();

router.get("/tampilgallery", getGallery);
router.get("/tampilgallery/:id_gallery", getGalleryById);
router.post("/addgallery", upload.single("gambar"), addGallery);
router.put(
  "/updategallery/:id_gallery",
  upload.single("gambar"),
  updateGallery
);
router.delete("/deletegallery/:id_gallery", deleteGallery);

export default router;
