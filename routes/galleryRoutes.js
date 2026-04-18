const express = require("express");
const {
  createGallery,
  getGallery,
  deleteGallery,
  updateGallery,
} = require("../controllers/galleryController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createGallery);

router.get("/", getGallery);

router.delete("/:id", authMiddleware, deleteGallery);

router.put("/:id", authMiddleware, upload.single("image"), updateGallery);

module.exports = router;
