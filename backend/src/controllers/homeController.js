import HomeImage from "../models/HomeImage.js";
import { uploadImage, deleteImage } from "../services/cloudinaryService.js";

const getHomeImages = async (req, res, next) => {
  try {
    const images = await HomeImage.find().sort({ slot: 1 }).lean();

    return res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    next(error);
  }
};

const uploadHomeImage = async (req, res, next) => {
  try {
    const { slot } = req.params;

    if (!["corporate", "artist"].includes(slot)) {
      return res.status(400).json({
        success: false,
        message: "Invalid home image slot",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const existingImage = await HomeImage.findOne({
      slot,
    });

    const uploaded = await uploadImage(req.file, `portfolio/home/${slot}`);

    if (existingImage) {
      const oldPublicId = existingImage.publicId;

      existingImage.url = uploaded.url;
      existingImage.publicId = uploaded.publicId;

      await existingImage.save();

      try {
        await deleteImage(oldPublicId);
      } catch (error) {
        console.error("Old Cloudinary image cleanup failed:", error.message);
      }

      return res.status(200).json({
        success: true,
        message: "Home image replaced successfully",
        image: existingImage,
      });
    }

    const image = await HomeImage.create({
      slot,
      url: uploaded.url,
      publicId: uploaded.publicId,
    });

    return res.status(201).json({
      success: true,
      message: "Home image uploaded successfully",
      image,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHomeImage = async (req, res, next) => {
  try {
    const { slot } = req.params;

    const image = await HomeImage.findOne({
      slot,
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Home image not found",
      });
    }

    await deleteImage(image.publicId);
    await HomeImage.deleteOne({ _id: image._id });

    return res.status(200).json({
      success: true,
      message: "Home image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { getHomeImages, uploadHomeImage, deleteHomeImage };
