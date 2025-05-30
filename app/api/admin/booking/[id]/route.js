import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/model/booking";

import RoomBookedDate from "@/model/roombookeddate";
import BookingRoomList from "@/model/bookingroomlist";

// Import your RoomBookedDate model
import { eachDayOfInterval, subDays } from "date-fns"; // For date manipulation

export async function PUT(req, context) {
  await dbConnect();
  const { id } = context.params;

  try {
    const body = await req.json();
    
    // Validate the incoming data
    if (!body.payment_status && !body.status && !body.check_in && !body.check_out) {
      return NextResponse.json(
        { success: false, error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    // 1. Find and update the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Update fields if they exist in the request
    if (body.payment_status !== undefined) {
      booking.payment_status = body.payment_status;
    }
    if (body.status !== undefined) {
      booking.status = body.status;
    }

    // Check if we need to update dates and room bookings
    if (body.check_in || body.check_out) {
      const newCheckIn = body.check_in ? new Date(body.check_in) : booking.check_in;
      const newCheckOut = body.check_out ? new Date(body.check_out) : booking.check_out;
      const rooms_id = body.rooms_id || booking.rooms_id._id;

      // Update booking dates
      booking.check_in = newCheckIn;
      booking.check_out = newCheckOut;
      booking.rooms_id = rooms_id;

      // 2. Delete previous booked dates
      await BookingRoomList.deleteMany({ booking_id: id });
      await RoomBookedDate.deleteMany({ booking_id: id });

      // 3. Generate date range (excluding checkout)
      const checkOutDateMinusOne = subDays(newCheckOut, 1); // exclude checkout
      const period = eachDayOfInterval({ 
        start: newCheckIn, 
        end: checkOutDateMinusOne 
      });

      // 4. Create new booking dates
      const newDates = period.map((date) => ({
        booking_id: booking._id,
        room_id: rooms_id,
        book_date: date,
      }));
      await RoomBookedDate.insertMany(newDates);
    }

    // Save the updated booking
    await booking.save();

    return NextResponse.json(
      { 
        success: true, 
        data: booking,
        message: 'Booking updated successfully' 
      },
      { status: 200 }
    );

  } catch (err) {
    console.log("err=========", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}