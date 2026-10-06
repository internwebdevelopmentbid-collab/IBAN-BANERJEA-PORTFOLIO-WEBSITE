import express from "express";

import {
  getHomeImages,
  uploadHomeImage,
  deleteHomeImage,
} from "../controllers/homeController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public
router.get("/", getHomeImages);

// Admin
router.post("/:slot", authMiddleware, upload.single("image"), uploadHomeImage);

router.delete("/:slot", authMiddleware, deleteHomeImage);

export default router;
