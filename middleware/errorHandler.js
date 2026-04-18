const errorHandler = (err, req, res, next) => {
  console.error(err);

  // ❌ Invalid MongoDB ID
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // ❌ Duplicate key (email etc.)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate field value (already exists)",
    });
  }

  // ❌ Validation error (mongoose)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // ❌ Default server error
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
