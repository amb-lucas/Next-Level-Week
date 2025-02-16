import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads", "points"),
    filename: (req, file, callback) => {
      const hash = crypto.randomBytes(10).toString("hex");
      const fileName = `${hash}_${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
