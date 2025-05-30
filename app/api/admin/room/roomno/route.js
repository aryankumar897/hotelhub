import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Room from "@/model/room";
import Facility from "@/model/facility";
import MultiImage from "@/model/multiimage";

import RoomNumber from "@/model/roomnumber";

export async function POST(req, context) {
  await dbConnect();

  const body = await req.json();
  console.log("Received update data:", body);

  try {
 

 // Extract fields that belong to RoomNumber
 const { status, roomNumber, room_id, roomtype_id } = body;


    const roomNumberData = {
        room_id: room_id, // Note: field name difference (rooms_id vs room_id)
        roomtype_id: roomtype_id,
        room_no: roomNumber,
        status: 1 // Convert to string if your schema expects it
      };




    await RoomNumber.create(roomNumberData);



    return NextResponse.json({success:"successfully updated"});
  } catch (err) {
    console.error("Error updating Room:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
