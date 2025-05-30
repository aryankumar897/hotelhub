


// Importing NextResponse for handling HTTP responses in Next.js
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing Team model to interact with the "Team" collection
import  RoomType  from "@/model/roomtype";
import Room from "@/model/room"

// GET function to fetch all Team
export async function GET() {
  // Establishing a connection to the database
  await dbConnect();

  try {
    // Fetching all categories from the Team collection, sorted by creation date in descending order
    const roomtype = await RoomType.find({}).sort({ createdAt: -1 });

    // Returning the Team as a JSON response
    return NextResponse.json(roomtype);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}





// POST function to create a new RoomType and associated Room
export async function POST(req) {
  await dbConnect(); // Connect to DB
  const body = await req.json();

  const {
    name,          // for RoomType       // optional - if you want to add an image
  } = body;

  try {
    // Create RoomType first
    const roomtype = await RoomType.create({ name });

    console.log("RoomType created -->", roomtype);

    // Now create a Room that references this RoomType
    const room = await Room.create({

      roomtype_id: roomtype?._id
    });

    console.log("Room created -->", room);

    // Return both created documents
    return NextResponse.json({ roomtype, room });
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
