import express from "express";
import {
  addPhoto,
  createAlbum,
  getAlbum,
} from "../controller/newAlbumController.js";
import upload from "../upload.js";

const router = express.Router();

router.post("/createAlbum", createAlbum);
router.post(`/addPhoto/:albumName`, upload.single("photo_path"), addPhoto);
router.get("/albums", getAlbum);

export default router;
