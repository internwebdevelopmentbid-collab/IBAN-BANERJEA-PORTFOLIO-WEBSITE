import express from "express";

import {
  getPortfolioImages,
  uploadPortfolioImage,
  deletePortfolioImage,
} from "../controllers/portfolioController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public
router.get("/:section", getPortfolioImages);

// Admin
router.post(
  "/:section/:slot",
  authMiddleware,
  upload.single("image"),
  uploadPortfolioImage,
);

router.delete("/:section/:slot", authMiddleware, deletePortfolioImage);

export default router;
