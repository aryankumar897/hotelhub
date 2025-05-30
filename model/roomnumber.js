import mongoose from "mongoose";

import RoomType from "./roomtype";
import Room from "./room";

const roomNumberSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId, // assuming it's a reference
      ref: "Room",
      required: true,
    },

    roomtype_id: {
      type: mongoose.Schema.Types.ObjectId, // assuming it's a reference
      ref: "RoomType",
      required: true,
    },

    room_no: {
      type: String,
      default: null,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

export default mongoose.models.RoomNumber ||
  mongoose.model("RoomNumber", roomNumberSchema);
