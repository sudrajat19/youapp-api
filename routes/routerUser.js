import express from "express";
import {
  getUsers,
  getUserById,
  addUsers,
  updateUsers,
  deleteUsers,
  login,
  updatePassword,
} from "../controller/userController.js";

const router = express.Router();

router.post("/login", login);
router.get("/tampil", getUsers);
router.get("/tampil/:id_users", getUserById);
router.post("/tambahuser", addUsers);
router.put("/updateuser/:id_users", updateUsers);
router.put("/updatepassword/:id_users", updatePassword);
router.delete("/deleteuser/:id_users", deleteUsers);

export default router;
