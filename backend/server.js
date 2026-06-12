const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://127.0.0.1:5500";

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(mongoSanitize());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/contact", contactRoutes);

app.use(
  express.static(path.join(__dirname, "../frontend"))
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found."
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error."
  });
});

app.listen(PORT, () => {
  console.log(`ExonClouds server running on port ${PORT}`);
});
