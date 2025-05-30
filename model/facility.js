import mongoose from "mongoose";

import Room from "./room";

const facilitySchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId, // assuming it's a reference
      ref: "Room",
      required: true,
    },

    facility_name: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Facility ||
  mongoose.model("Facility", facilitySchema);
