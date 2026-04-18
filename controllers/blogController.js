const Blog = require("../models/Blog");

// 1. GET ALL BLOGS (For Home Page)
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

// 2. GET SINGLE BLOG BY ID
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "userId",
      "name email",
    );

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// 3. CREATE BLOG (With Location & Image)
const createBlog = async (req, res, next) => {
  try {
    const { title, content, location } = req.body;

    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : "";

    const newBlog = await Blog.create({
      title,
      content,
      location: location || "Location not set",
      image: imagePath,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully! 🎉",
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

// 4. UPDATE BLOG (With Location)
const updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this blog" });
    }

    const updateData = {
      title: req.body.title,
      content: req.body.content,
      location: req.body.location, // ✅ Location update support
    };

    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Blog updated! ✅",
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

// 5. DELETE BLOG
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await blog.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully 🗑️" });
  } catch (error) {
    next(error);
  }
};

const getMyBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
};
