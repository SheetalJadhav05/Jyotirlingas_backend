const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Database Connection
connectDB();

// Middleware
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jyotirlingas-frontend.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/v1/blog", require("./routes/blogRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/jyotirlingas", require("./routes/jyotirlingaRoutes"));

app.use("/api/contact", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
