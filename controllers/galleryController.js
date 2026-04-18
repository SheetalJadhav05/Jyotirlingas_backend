const Gallery = require("../models/Gallery");

// CREATE IMAGE
const createGallery = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image required" });
    }

    const imagePath = req.file.filename;

    const newImage = await Gallery.create({
      title: title || "Untitled",
      image: imagePath,
      userId: req.user._id, 
    });

    res.status(201).json({ success: true, data: newImage });
  } catch (error) {
    next(error);
  }
};

// GET ALL IMAGES
const getGallery = async (req, res, next) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

// DELETE IMAGE
const deleteGallery = async (req, res, next) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// UPDATE IMAGE
const updateGallery = async (req, res, next) => {
  try {
    let updateData = { title: req.body.title };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGallery, getGallery, deleteGallery, updateGallery };
