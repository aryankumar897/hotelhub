import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Room from "@/model/room";
import Facility from "@/model/facility";
import MultiImage from "@/model/multiimage";

import RoomNumber from "@/model/roomnumber";

export async function PUT(req, context) {
  await dbConnect();

  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Room ID is required." },
      { status: 400 }
    );
  }

  const body = await req.json();
  console.log("Received update data:", body);

  try {
    // Extract facilities and gallery_images from the body
    const facilities = body.facilities || [];
    const galleryImages = body.gallery_images || [];
    delete body.facilities; // Remove facilities from the room update data
    delete body.gallery_images; // Remove gallery_images from the room update data

    // Create an update object with only the fields that have values
    const updateData = {};
    for (const key in body) {
      if (body[key] !== null && body[key] !== undefined && body[key] !== "") {
        updateData[key] = body[key];
      }
    }

    console.log("Filtered update data:", updateData);

    // First update the room document
    const updatingRoom = await Room.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatingRoom) {
      return NextResponse.json({ error: "Room not found." }, { status: 404 });
    }

    // Handle facilities update
    if (facilities.length > 0) {
      // First, remove all existing facilities for this room
      await Facility.deleteMany({ room_id: id });

      // Then create new facility documents for each selected facility
      const facilityPromises = facilities.map((facilityName) =>
        Facility.create({
          room_id: id,
          facility_name: facilityName,
        })
      );
      await Promise.all(facilityPromises);
    } else {
      // If no facilities are provided, remove all existing ones
      await Facility.deleteMany({ room_id: id });
    }

    // Handle gallery images update
    if (galleryImages.length > 0) {
      // First, remove all existing images for this room
      await MultiImage.deleteMany({ room_id: id });

      // Then create new image documents for each image URL
      const imagePromises = galleryImages.map((imageUrl) =>
        MultiImage.create({
          room_id: id,
          multi_image: imageUrl,
        })
      );
      await Promise.all(imagePromises);
    } else {
      // If no images are provided, remove all existing ones
      await MultiImage.deleteMany({ room_id: id });
    }

    // // Fetch the updated room with its facilities and images
    // const updatedRoom = await Room.findById(id).lean();
    // const roomFacilities = await Facility.find({ room_id: id }).lean();
    // const roomImages = await MultiImage.find({ room_id: id }).lean();

    // // Combine the room data with its facilities and images
    // const responseData = {
    //   ...updatedRoom,
    //   facilities: roomFacilities.map((f) => f.facility_name),
    //   gallery_images: roomImages.map((img) => img.multi_image),
    // };

    return NextResponse.json({success:"successfully updated"});
  } catch (err) {
    console.error("Error updating Room:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE method for deleting a Team
export async function DELETE(req, context) {
  // Establishing a connection to the database
  await dbConnect();
 
  try {
    // Finding the Team by its ID (from context.params.id) and deleting it
    const deletingRoom = await Room.findByIdAndDelete(
      context.params.id // The Team ID to delete, coming from the URL parameters
    );

    // Returning the deleted Team as a JSON response
    return NextResponse.json(deletingRoom);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
