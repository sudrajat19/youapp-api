import express from "express";
import {
  addAnggota,
  deleteanggota,
  getAnggota,
  getAnggotaById,
  updateAnggota,
} from "../controller/anggotaController.js";
import upload from "../upload.js";

const router = express.Router();

router.get("/tampilanggota", getAnggota);
router.get("/tampilanggota/:id_anggota", getAnggotaById);
router.post("/addanggota", upload.single("photo"), addAnggota);
router.put("/updateanggota/:id_users", upload.single("photo"), updateAnggota);
router.delete("/deleteanggota/:id_anggota", deleteanggota);

export default router;
