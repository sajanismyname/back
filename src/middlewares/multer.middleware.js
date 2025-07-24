import multer from "multer";
import path from "path";
import fs from "fs";

const destPath = path.join(process.cwd(), "public", "temp");

if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
