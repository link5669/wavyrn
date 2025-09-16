import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default function authRoute() {
  const router = express.Router();

  const HASHED_PASSWORD = process.env.EDITOR_PASSWORD
  const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key";

  // POST route to verify password
  router.post("/verify", async (req, res) => {
    try {
      const { password } = req.body;

      // Validate required field
      if (!password) {
        return res.status(400).json({
          error: "Password is required",
        });
      }

      // Compare password with hash
      const isValid = await bcrypt.compare(password, HASHED_PASSWORD);

      if (!isValid) {
        return res.status(401).json({
          error: "Invalid password"
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { authenticated: true, timestamp: Date.now() },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        success: true,
        message: "Authentication successful",
        token: token
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to verify token
  router.get("/verify-token", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          error: "No token provided"
        });
      }

      const token = authHeader.split(' ')[1];

      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET);

      res.status(200).json({
        success: true,
        message: "Token is valid",
        data: {
          authenticated: decoded.authenticated,
          timestamp: decoded.timestamp
        }
      });
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          error: "Invalid token"
        });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: "Token expired"
        });
      }
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
