import express from "express";
import upload from "../upload.js";
import {
  addProfile,
  deleteProfile,
  getProfile,
  getProfileById,
  updateProfile,
} from "../controller/profileController.js";

const router = express.Router();

router.get("/showprofile", getProfile);
router.get("/showprofile/:id_users", getProfileById);
router.post("/addprofile", upload.single("photo"), addProfile);
router.put("/updateprofile/:id_users", upload.single("photo"), updateProfile);
router.delete("/deleteprofile/:id_profile", deleteProfile);

export default router;
