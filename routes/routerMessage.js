// routes/chat.js
import express from "express";
import {
  getChatHistory,
  // uploadImage,
} from "../controller/messageController.js";
import upload from "../upload.js";

const router = express.Router();

router.get("/chat-history", getChatHistory);
router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: `/images/${req.file.filename}` });
});

export default router;
