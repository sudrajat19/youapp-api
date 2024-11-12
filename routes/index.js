import express from "express";
import routerUser from "./routerUser.js";
import routerAnggota from "./routerAnggota.js";
import routerGallery from "./routerGallery.js";
import routerMessage from "./routerMessage.js"; // Import rute pesan
import routerAlbum from "./routerAlbum.js";

const router = express.Router();

// Menggunakan rute yang telah diimpor
router.use(routerUser); // Rute untuk pengguna
router.use(routerAnggota); // Rute untuk anggota
router.use(routerGallery); // Rute untuk galeri
router.use("/messages", routerMessage);
router.use(routerAlbum);
export default router;
