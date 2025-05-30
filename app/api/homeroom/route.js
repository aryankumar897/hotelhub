// Importing NextResponse for handling HTTP responses in Next.js
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

import Room from "@/model/room";
import RoomType from "@/model/roomtype";


// GET function to fetch all rooms with populated roomtype and facilities
export async function GET() {
  // Establishing a connection to the database
  await dbConnect();
  
  try {
    // Fetching all rooms and populating the roomtype_id reference
    const rooms = await Room.find({})
      .populate({
        path: "roomtype_id",
        model: RoomType,
        select: "name", // Specify fields you want from RoomType
      })
      .lean(); // Convert to plain JavaScript objects

   
    return NextResponse.json(rooms);
  } catch (err) {
    console.log("Error fetching rooms:", err);
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json(
      { error: err.message || "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
