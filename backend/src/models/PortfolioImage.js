import mongoose from "mongoose";

const portfolioImageSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ["corporate", "artist"],
      required: true,
    },

    slot: {
      type: String,
      enum: ["hero", "about1", "about2"],
      required: true,
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
  },
  {
    timestamps: true,
  },
);

portfolioImageSchema.index({ section: 1, slot: 1 }, { unique: true });

const PortfolioImage = mongoose.model("PortfolioImage", portfolioImageSchema);

export default PortfolioImage;
