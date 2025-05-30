import dbConnect from "@/utils/dbConnect";
import BookingRoomList from "@/model/BookingRoomList";
import RoomNumber from "@/model/RoomNumber";
import { NextResponse } from "next/server";

// Dynamic route: /api/booking-cancel/[bookingId]/[roomsId]/[roomNumberId]
export async function DELETE(req, context) {
  await dbConnect();

  try {
    const { id } = await context.params;

    // ✅ Manually parse the query string from `id`
    const params = new URLSearchParams(id);
    const bookingId = params.get("bookingId");
    const roomsId = params.get("roomsId");
    const roomNumberId = params.get("roomNumber");

    if (!bookingId || !roomsId || !roomNumberId) {
      return NextResponse.json(
        { message: "Missing required parameters", alertType: "error" },
        { status: 400 }
      );
    }

  // 1. Find and delete the BookingRoomList document
const deletedBookingRoom = await BookingRoomList.findOneAndDelete({
  booking_id: bookingId,
  room_id: roomsId,
});

// 2. Use the actual room_number_id from that document
let updatedRoom = null;
if (deletedBookingRoom?.room_number_id) {
  updatedRoom = await RoomNumber.findByIdAndUpdate(
    deletedBookingRoom.room_number_id,
    { status: 1 },
    { new: true }
  );
}

    console.log("deletedBookingRoom ", deletedBookingRoom);

    return NextResponse.json({
      message: "Room status updated and booking entry deleted",
    });
  } catch (error) {
    console.log("Error in DELETE route:", error);
    return NextResponse.json(
      { message: "Server error", alertType: "error" },
      { status: 500 }
    );
  }
}
