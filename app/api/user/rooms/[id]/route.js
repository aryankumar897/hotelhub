import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Room from "@/model/room";
import { differenceInDays } from "date-fns"; // Optional: use this for better date handling

export async function GET(req, context) {
  await dbConnect();

  try {
    const { id } = await context.params;

    // Parse the parameters from the id string
    const params = new URLSearchParams(id);
    const checkIn = params.get("checkIn");
    const checkOut = params.get("checkOut");
    const roomId = params.get("roomId");
    const rooms = parseInt(params.get("rooms") || 1); // Default to 1 room
    const guests = parseInt(params.get("guests") || 1); // Default to 1 guest

    console.log("Parsed parameters:", {
      checkIn,
      checkOut,
      roomId,
      rooms,
      guests,
    });

    // Calculate number of nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.max(1, differenceInDays(checkOutDate, checkInDate));

    // Fetch the room details
    const room = await Room.findById(roomId);

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const pricePerNight = room.price;
    const discountPercent = room.discount || 0;

    const subtotal = pricePerNight * nights * rooms;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal - discountAmount;

    const result = {
     
      subtotal,
      discountPercent,
      discountAmount,
      total,
    };

    console.log("calculate result ", result);

    return NextResponse.json(result);
  } catch (err) {
    console.log("Error fetching room details or calculating prices:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch room pricing" },
      { status: 500 }
    );
  }
}

//990//100

//code   for this

// export async function POST(req) {
//   await dbConnect();

//   const body = await req.json();
//   const { check_in, check_out, room_id } = body;

//   try {
//     // 1. Date range array
//     const sDate = new Date(check_in);
//     const eDate = new Date(check_out);
//     eDate.setDate(eDate.getDate() - 1);

//     const dt_array = [];
//     const current = new Date(sDate);
//     while (current <= eDate) {
//       dt_array.push(current.toISOString().split("T")[0]);
//       current.setDate(current.getDate() + 1);
//     }

//     // 2. Get booking IDs for the given dates
//     const bookingIds = await RoomBookedDate.find({
//       book_date: { $in: dt_array },
//     }).distinct("booking_id");

//     // 3. Get room and count
//     const room = await Room.findById(room_id).populate("room_numbers");
//     const roomNumbersCount = room.room_numbers.length;

//     // 4. Bookings that overlap the requested dates
//     const bookings = await Booking.find({
//       _id: { $in: bookingIds },
//       rooms_id: room_id,
//     });

//     // 5. Sum booked rooms
//     const total_book_room = bookings.reduce(
//       (sum, booking) => sum + (booking.assign_rooms_count || 0),
//       0
//     );

//     const available_room = roomNumbersCount - total_book_room;

//     // 6. Calculate total nights
//     const fromDate = new Date(check_in);
//     const toDate = new Date(check_out);
//     const timeDiff = Math.abs(toDate - fromDate);
//     const total_nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//     // 7. Response
//     return NextResponse.json({
//       available_room,
//       total_nights,
//     });

//   } catch (error) {
//     console.error("Availability check failed:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
