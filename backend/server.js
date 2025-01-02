import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// Load environment variables
dotenv.config();

// Resolve the directory name
const __dirname = path.resolve();

// Use environment variable for the port or default to 5000
const PORT = process.env.PORT || 5000;

// Debug log to ensure the MongoDB URI is loaded
if (!process.env.MONGO_DB_URI) {
  console.error("Error: MONGO_DB_URI is not defined in the environment variables.");
  process.exit(1); // Exit if the MongoDB URI is missing
}

// Middleware to parse JSON payloads
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the frontend dist folder
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Handle all other routes and serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
server.listen(PORT, async () => {
  try {
    // Connect to MongoDB
    await connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit if the database connection fails
  }
});
