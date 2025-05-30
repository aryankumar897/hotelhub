import mongoose from "mongoose";

const roomBookedDateSchema = new mongoose.Schema(
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
    book_date: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.RoomBookedDate ||
  mongoose.model("RoomBookedDate", roomBookedDateSchema);
