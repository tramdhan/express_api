const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");

/** Backend file upload, works with the "FileUpload" component in front-end app */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const maxSize = 1 * 1024 * 1024; // 1 MB

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only supporting png, jpeg ,jpg and svg format images"));
  }
};

const upload = multer({ storage, fileFilter: fileFilter, limits: { fileSize: maxSize } }).array("file");

router.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.files);
  });
});

module.exports = router;
