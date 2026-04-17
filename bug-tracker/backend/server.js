const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./config/db");
const swaggerSpec = require("./config/swagger");

dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const bugRoutes = require("./routes/bugRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR: JWT_SECRET is not set in environment variables");
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not set in environment variables");
  process.exit(1);
}

connectDB();

const app = express();

// CORS Configuration - Allow requests from Vercel frontend
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://localhost:5173",
  process.env.FRONTEND_URL, // Vercel frontend URL
].filter(Boolean);
const isProduction = process.env.NODE_ENV === "production";

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (!isProduction) {
      return callback(null, true);
    }

    return callback(new Error("CORS policy: Origin not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "🐛 BugHive API is running",
    version: "1.0.0",
    status: "healthy",
  });
});

// Health check endpoint (for Render monitoring)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api/docs.json", (req, res) => {
  res.json(swaggerSpec);
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);
app.use("/api", commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode =
    res.statusCode === 200
      ? err.message === "CORS policy: Origin not allowed"
        ? 403
        : 500
      : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Database: Connected to MongoDB`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
