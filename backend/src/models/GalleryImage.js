import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ["corporate", "artist"],
      required: true,
      index: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

galleryImageSchema.index({
  section: 1,
  order: 1,
});

const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);

export default GalleryImage;
