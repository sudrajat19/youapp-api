import multer from "multer";
import fs from "fs";
import path from "path";

//multer
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    let timestamp = Date.now();
    let fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "file type tidak valid, masukkan data dengan eksistensi jpg, png, dan jpeg"
      )
    );
  }
};

const upload = multer({
  storage: fileStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

export default upload;
