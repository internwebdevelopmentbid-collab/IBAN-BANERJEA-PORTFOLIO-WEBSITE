import GalleryImage from "../models/GalleryImage.js";
import { uploadImage, deleteImage } from "../services/cloudinaryService.js";

const validSections = ["corporate", "artist"];

const getGalleryImages = async (req, res, next) => {
  try {
    const { section } = req.params;

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery section",
      });
    }

    const images = await GalleryImage.find({
      section,
    })
      .sort({ order: 1, createdAt: 1 })
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

const uploadGalleryImages = async (req, res, next) => {
  const uploadedCloudinaryImages = [];

  try {
    const { section } = req.params;

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery section",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const existingCount = await GalleryImage.countDocuments({
      section,
    });

    if (existingCount + req.files.length > 100) {
      return res.status(400).json({
        success: false,
        message: "A gallery can contain a maximum of 100 images",
      });
    }

    const lastImage = await GalleryImage.findOne({
      section,
    }).sort({ order: -1 });

    const startingOrder = lastImage ? lastImage.order + 1 : 0;

    // Upload all files to Cloudinary.
    const cloudinaryImages = await Promise.all(
      req.files.map(async (file) => {
        const uploaded = await uploadImage(
          file,
          `portfolio/gallery/${section}`,
        );

        uploadedCloudinaryImages.push(uploaded);

        return uploaded;
      }),
    );

    // Create MongoDB records only after all Cloudinary
    // uploads have succeeded.
    const documents = cloudinaryImages.map((uploaded, index) => ({
      section,
      url: uploaded.url,
      publicId: uploaded.publicId,
      order: startingOrder + index,
    }));

    const images = await GalleryImage.insertMany(documents);

    return res.status(201).json({
      success: true,
      message: `${images.length} gallery images uploaded successfully`,
      images,
    });
  } catch (error) {
    // If Cloudinary uploads succeeded but MongoDB failed,
    // clean up the Cloudinary assets.
    await Promise.allSettled(
      uploadedCloudinaryImages.map((image) => deleteImage(image.publicId)),
    );

    next(error);
  }
};

const deleteGalleryImage = async (req, res, next) => {
  try {
    const { section, id } = req.params;

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery section",
      });
    }

    const image = await GalleryImage.findOne({
      _id: id,
      section,
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    await deleteImage(image.publicId);

    await GalleryImage.deleteOne({
      _id: image._id,
    });

    // Normalize ordering after deletion.
    const remainingImages = await GalleryImage.find({
      section,
    }).sort({ order: 1 });

    await Promise.all(
      remainingImages.map((item, index) =>
        GalleryImage.updateOne({ _id: item._id }, { $set: { order: index } }),
      ),
    );

    return res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const reorderGalleryImages = async (req, res, next) => {
  try {
    const { section } = req.params;
    const { imageIds } = req.body;

    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery section",
      });
    }

    if (!Array.isArray(imageIds)) {
      return res.status(400).json({
        success: false,
        message: "imageIds must be an array",
      });
    }

    const images = await GalleryImage.find({
      section,
    }).select("_id");

    const existingIds = new Set(images.map((image) => image._id.toString()));

    if (
      imageIds.length !== existingIds.size ||
      imageIds.some((id) => !existingIds.has(id))
    ) {
      return res.status(400).json({
        success: false,
        message: "The supplied image order does not match the gallery",
      });
    }

    await Promise.all(
      imageIds.map((id, index) =>
        GalleryImage.updateOne(
          {
            _id: id,
            section,
          },
          {
            $set: {
              order: index,
            },
          },
        ),
      ),
    );

    const updatedImages = await GalleryImage.find({
      section,
    })
      .sort({ order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Gallery order updated successfully",
      images: updatedImages,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getGalleryImages,
  uploadGalleryImages,
  deleteGalleryImage,
  reorderGalleryImages,
};
