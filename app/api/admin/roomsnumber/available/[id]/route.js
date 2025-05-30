import { NextResponse } from "next/server";



import dbConnect from "@/utils/dbConnect";
import RoomNumber from "@/model/roomnumber";

export async function GET(req, context) {
  await dbConnect();
  
  try {
    // Extract and parse the parameters from the dynamic route
    const { id } = await context.params;
    const [roomId, roomType] = id.split('&').map(param => {
      const [key, value] = param.split('=');
      return value; // Returns just the value part
    });

    console.log("Parsed parameters:", { roomId, roomType });

    // Validate required parameters
    if (!roomId || !roomType) {
      return NextResponse.json(
        { error: "Missing required parameters (roomId, roomType)" },
        { status: 400 }
      );
    }

    // Query to find available room numbers
    const availableRooms = await RoomNumber.find({
      room_id: roomId,
      roomtype_id: roomType,
    
    })
    // .populate('room_id')
    // .populate('roomtype_id');


 console.log("availableRooms",availableRooms)

    return NextResponse.json(availableRooms);
  } catch (err) {
    console.error("Error in API:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}