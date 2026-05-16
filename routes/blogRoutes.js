const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/", getBlogs);
router.get("/my-blogs", authMiddleware, getMyBlogs);
router.get("/:id", getBlogById);

router.post("/createBlog", authMiddleware, upload.single("image"), createBlog);

router.put("/:id", authMiddleware, upload.single("image"), updateBlog);

router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
