import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

import Booking from "@/model/booking"; // Make sure this model is correct

export async function GET(req) {
  await dbConnect(); // Connect to MongoDB
  const session = await getServerSession(authOptions); // Get logged-in user session

  try {
    if (!session?.user?._id) {
      return NextResponse.json({ err: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user._id;

    // Find bookings where user_id matches the logged-in user's _id
    const bookings = await Booking.find({ user_id: userId }).sort({ createdAt: -1 });

 console.log(bookings)


    return NextResponse.json(bookings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
