// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Room from "@/model/room";
// import RoomType from "@/model/roomtype";

// export async function GET(  req , context  ) {
//   await dbConnect();

//    const {id}= await  context.params

//   console.log("id", id)

//    console.log("Raw id:", id);

//   // Parse the parameters from the id string
//   const params = new URLSearchParams(id);
//   const checkIn = params.get('checkIn');
//   const checkOut = params.get('checkOut');
//   const guests = parseInt(params.get('guests') || 1); // Default to 1 if not provided

//   console.log("Parsed parameters:", {
//     checkIn,
//     checkOut,
//     guests
//   });

//   try {
//     // Fetch rooms that can accommodate at least the requested number of adults
//     const rooms = await Room.find({
//       total_adult: { $eq: guests } // Rooms where total_adult is >= requested guests
//     })
//     .populate({
//       path: "roomtype_id",
//       model: RoomType,
//       select: "name",
//     })
//     .lean();

//     return NextResponse.json(rooms);
//   } catch (err) {
//     console.log("Error fetching rooms:", err);
//     return NextResponse.json(
//       { error: err.message || "Failed to fetch rooms" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Room from "@/model/Room";
import RoomNumber from "@/model/RoomNumber";
import RoomBookedDate from "@/model/RoomBookedDate";
import BookingRoomList from "@/model/BookingRoomList";


export async function GET(req, context) {
  await dbConnect();

  const { id } = await context.params;

  const params = new URLSearchParams(id);
  const check_in = params.get("checkIn");
  const check_out = params.get("checkOut");
  const guests = parseInt(params.get("guests") || "1");

  // console.log("Parsed parameters:", {
  //   check_in,
  //   check_out,
  //   guests,
  // });

  try {
    // Create date range array
    const sdate = new Date(check_in);
    const edate = new Date(check_out);

    const dt_array = [];
    const current = new Date(sdate);
    while (current < edate) {
      dt_array.push(new Date(current).toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    // 1. Get booking IDs for the selected dates
    const bookingDates = await RoomBookedDate.find({
      book_date: { $in: dt_array },
    }).distinct("booking_id");

    // 2. Get all active rooms
    const rooms = await Room.find({ status: 1 }).populate('roomtype_id');

    const availableRooms = [];

    // 3. Calculate availability for each room
    for (const room of rooms) {
      const roomNumbersCount = await RoomNumber.countDocuments({
        room_id: room._id,
        status: 1,
      });

      const bookedRooms = await BookingRoomList.find({
        booking_id: { $in: bookingDates },
        room_id: room._id,
      });

      const totalBooked = bookedRooms.length;
      const availableRoom = roomNumbersCount - totalBooked;

      // 👇 Match guest capacity and available room logic here
      if (availableRoom > 0 && guests <= parseInt(room?.total_adult)) {
        availableRooms.push({
          ...room.toObject(),
          availableRoom,
        });
      }
    }

    console.log(" availableRoom ", availableRooms);

    return NextResponse.json(availableRooms);

    // return NextResponse.json({
    //   rooms: availableRooms,
    //   check_date_booking_ids: bookingDates,
    // });
  } catch (error) {
    console.error("Room availability check error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
