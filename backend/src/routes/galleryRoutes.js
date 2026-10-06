import express from "express";

import {
  getGalleryImages,
  uploadGalleryImages,
  deleteGalleryImage,
  reorderGalleryImages,
} from "../controllers/galleryController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public
router.get("/:section", getGalleryImages);

// Admin
router.post(
  "/:section",
  authMiddleware,
  upload.array("images", 20),
  uploadGalleryImages,
);

router.delete("/:section/:id", authMiddleware, deleteGalleryImage);

router.patch("/:section/reorder", authMiddleware, reorderGalleryImages);

export default router;
