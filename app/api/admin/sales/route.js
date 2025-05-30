import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/model/booking";

export async function GET() {
  await dbConnect();

  try {
    // Group bookings by month and calculate total revenue
    const revenueData = await Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          totalRevenue: { $sum: "$total_price" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    return NextResponse.json(revenueData);
  } catch (err) {
    console.error("❌ Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}