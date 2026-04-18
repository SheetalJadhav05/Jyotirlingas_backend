const Jyotirlinga = require("../models/Jyotirlinga");

// GET ALL
exports.getJyotirlingas = async (req, res, next) => {
  try {
    const data = await Jyotirlinga.find();
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

// CREATE
exports.createJyotirlinga = async (req, res, next) => {
  try {
    const item = await Jyotirlinga.create({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.json(item);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateJyotirlinga = async (req, res, next) => {
  try {
    let data = { ...req.body };

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Jyotirlinga.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteJyotirlinga = async (req, res, next) => {
  try {
    await Jyotirlinga.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
