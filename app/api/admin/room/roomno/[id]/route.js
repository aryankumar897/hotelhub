import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import RoomNumber from "@/model/roomnumber";

export async function PUT(req, context) {
  await dbConnect();

  const { id } = await context.params; // Removed await since context.params is synchronous

  if (!id) {
    return NextResponse.json(
      { error: "Room ID is required." },
      { status: 400 }
    );
  }

  const body = await req.json();
  console.log("Received update data for roomnumber:", body);

  try {
    // Find the room by ID and update it with the new data
    const updatedRoom = await RoomNumber.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedRoom) {
      return NextResponse.json(
        { error: "Room not found with the given ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: "Room successfully updated",
      data: updatedRoom,
    });
  } catch (err) {
    console.error("Error updating Room:", err);

    // Handle validation errors specifically
    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  // Establishing a connection to the database
  await dbConnect();
  const { id } = await context.params;
  try {
    // Finding the Team by its ID (from context.params.id) and deleting it
    const deletingRoom = await RoomNumber.findByIdAndDelete(
      id // The Team ID to delete, coming from the URL parameters
    );

    console.log("deletingRoom ", deletingRoom);
    // Returning the deleted Team as a JSON response
    return NextResponse.json(deletingRoom);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
