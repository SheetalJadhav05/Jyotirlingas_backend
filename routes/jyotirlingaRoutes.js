const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const controller = require("../controllers/jyotirlingaController");

// ✅ Multer setup FIX
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", controller.getJyotirlingas);
router.post("/", upload.single("image"), controller.createJyotirlinga);
router.put("/:id", upload.single("image"), controller.updateJyotirlinga);
router.delete("/:id", controller.deleteJyotirlinga);

module.exports = router;
