// Importing NextResponse for handling HTTP responses in Next.js
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

import Room from "@/model/room";
import RoomType from "@/model/roomtype";
import Facility from "@/model/facility";
import MultiImage from "@/model/multiimage";
import RoomNumber from "@/model/roomnumber";

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

    // Get all room IDs for facility lookup
    const roomIds = rooms.map((room) => room._id);

    // Fetch all facilities for all rooms in a single query
    const roomFacilities = await Facility.find({
      room_id: { $in: roomIds },
    }).lean();

    const roomImages = await MultiImage.find({
      room_id: { $in: roomIds },
    }).lean();

    const roomNumbers = await RoomNumber.find({
      room_id: { $in: roomIds },
    }).lean();

    // Create a map of room_id to facilities for efficient lookup
    const facilitiesMap = roomFacilities.reduce((map, facility) => {
      if (!map[facility.room_id]) {
        map[facility.room_id] = [];
      }
      map[facility.room_id].push(facility.facility_name);
      return map;
    }, {});

    // Create a map of room_id to images for efficient lookup
    const imagesMap = roomImages.reduce((map, image) => {
      if (!map[image.room_id]) {
        map[image.room_id] = [];
      }
      map[image.room_id].push(image.multi_image);
      return map;
    }, {});

    // Create a map of room_id to room numbers for efficient lookup
    const roomNumbersMap = roomNumbers.reduce((map, roomNumber) => {
      if (!map[roomNumber.room_id]) {
        map[roomNumber.room_id] = [];
      }
      map[roomNumber.room_id].push(roomNumber);
      return map;
    }, {});

    // Combine room data with their respective facilities, images, and room numbers
    const responseData = rooms.map((room) => ({
      ...room,
      facilities: facilitiesMap[room._id] || [], // Add empty array if no facilities
      gallery_images: imagesMap[room._id] || [], // Add empty array if no images
      room_numbers: roomNumbersMap[room._id] || [], // Add empty array if no room numbers
    }));

 console.log("responseData============================================================= ",responseData )





    console.log("Rooms with facilities, images, and room numbers fetched ==>", responseData);
    return NextResponse.json(responseData);
  } catch (err) {
    console.log("Error fetching rooms:", err);
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json(
      { error: err.message || "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}