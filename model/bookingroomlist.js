import mongoose from "mongoose";

import Room from "./room";
import Booking from "./booking"
import RoomNumber  from "./roomnumber"


const bookingroomlistSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },
    room_number_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomNumber",
      default: null,
      
      
      },
  },
  { timestamps: true }
);

export default mongoose.models.BookedRoomList ||
  mongoose.model("BookedRoomList", bookingroomlistSchema);
