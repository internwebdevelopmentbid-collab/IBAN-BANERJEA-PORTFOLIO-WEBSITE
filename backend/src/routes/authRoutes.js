import express from "express";

import {
  login,
  logout,
  getCurrentAdmin,
} from "../controllers/authController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.get("/me", authMiddleware, getCurrentAdmin);

export default router;
