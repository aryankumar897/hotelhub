import mongoose from "mongoose";

const bookareaSchema = new mongoose.Schema(
  {
    shortTitle: {
      type: String,
      default: "",
    },
    mainTitle: {
      type: String,
      default: "",
    },
    shortDesc: {
      type: String,
      default: "",
    },
    linkUrl: {
      type: String,
      default: "",
    },
    photoUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// If the model already exists, use that, otherwise create a new one
export default mongoose.models.BookArea ||
  mongoose.model("BookArea", bookareaSchema);
