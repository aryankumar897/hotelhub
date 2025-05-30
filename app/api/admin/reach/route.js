// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";

// import Booking from "@/model/booking";

// export async function GET() {
//   await dbConnect();

//   try {
//     // Fetch bookings and populate single room + roomtype
//     const bookings = await Booking.find({});

//     return NextResponse.json(bookings);
//   } catch (err) {
//     console.error("❌ Error:", err);
//     return NextResponse.json(
//       { error: err.message || "Failed to fetch bookings" },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/model/booking";

export async function GET() {
  await dbConnect();

  try {
    // Fetch bookings and group by country with count
    const countryData = await Booking.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 }
        }
      }
    ]);

     console.log(" countryData", countryData )
    return NextResponse.json(countryData);
  } catch (err) {
    console.error("❌ Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}