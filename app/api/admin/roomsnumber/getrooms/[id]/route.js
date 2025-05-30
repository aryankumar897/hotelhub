import dbConnect from "@/utils/dbConnect";
import Booking from "@/model/Booking";
import BookingRoomList from "@/model/BookingRoomList";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { id } =  await   context.params; // id = booking ID

  try {
    await dbConnect();

    // Check if booking exists
    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    // Find all BookingRoomList entries related to this booking
    const roomList = await BookingRoomList.find({ booking_id: id })
      
      .populate("room_number_id");

    console.log("roomList ", roomList);

    return NextResponse.json(roomList);
  } catch (error) {
    console.error("Assign Room Error:", error);
    return NextResponse.json(
      {
        message: "Server error",
        alertType: "error",
      },
      { status: 500 }
    );
  }
}
