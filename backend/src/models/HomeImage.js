import mongoose from "mongoose";

const homeImageSchema = new mongoose.Schema(
  {
    slot: {
      type: String,
      enum: ["corporate", "artist"],
      required: true,
      unique: true,
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

const HomeImage = mongoose.model("HomeImage", homeImageSchema);

export default HomeImage;
