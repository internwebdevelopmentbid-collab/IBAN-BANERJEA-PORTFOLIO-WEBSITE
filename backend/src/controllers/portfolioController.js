import PortfolioImage from "../models/PortfolioImage.js";
import { uploadImage, deleteImage } from "../services/cloudinaryService.js";

const validSections = ["corporate", "artist"];
const validSlots = ["hero", "about1", "about2"];

const getPortfolioImages = async (req, res, next) => {
  try {
    const { section } = req.params;

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio section",
      });
    }

    const images = await PortfolioImage.find({
      section,
    })
      .sort({ slot: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      section,
      images,
    });
  } catch (error) {
    next(error);
  }
};

const uploadPortfolioImage = async (req, res, next) => {
  try {
    const { section, slot } = req.params;

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio section",
      });
    }

    if (!validSlots.includes(slot)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio image slot",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const existingImage = await PortfolioImage.findOne({
      section,
      slot,
    });

    const uploaded = await uploadImage(
      req.file,
      `portfolio/${section}/${slot}`,
    );

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
        message: "Portfolio image replaced successfully",
        image: existingImage,
      });
    }

    const image = await PortfolioImage.create({
      section,
      slot,
      url: uploaded.url,
      publicId: uploaded.publicId,
    });

    return res.status(201).json({
      success: true,
      message: "Portfolio image uploaded successfully",
      image,
    });
  } catch (error) {
    next(error);
  }
};

const deletePortfolioImage = async (req, res, next) => {
  try {
    const { section, slot } = req.params;

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio section",
      });
    }

    if (!validSlots.includes(slot)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio image slot",
      });
    }

    const image = await PortfolioImage.findOne({
      section,
      slot,
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Portfolio image not found",
      });
    }

    await deleteImage(image.publicId);

    await PortfolioImage.deleteOne({
      _id: image._id,
    });

    return res.status(200).json({
      success: true,
      message: "Portfolio image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { getPortfolioImages, uploadPortfolioImage, deletePortfolioImage };
