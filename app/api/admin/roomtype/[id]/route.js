import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Room from "@/model/room";
import Facility from "@/model/facility";
import MultiImage from "@/model/multiimage";
import RoomNumber from "@/model/roomnumber";
import RoomType from "@/model/roomtype";

export async function DELETE(req, context) {
  await dbConnect();
  const { id } = await context.params;

  try {
   

    try {
      // 1. First, find and delete the room type
      const deletedRoomType =
        await RoomType.findByIdAndDelete(id)

      if (!deletedRoomType) {
        
        return NextResponse.json(
          { success: false, error: "Room type not found" },
          { status: 404 }
        );
      }

      // 2. Find all rooms with this room type ID
      const rooms = await Room.find({ roomtype_id: id })

      // 3. For each room, delete associated documents
      const roomDeletionPromises = rooms.map(async (room) => {
        // Delete associated facilities
        await Facility.deleteMany({ room_id: room._id })

        // Delete associated multi-images
        await MultiImage.deleteMany({ room_id: room._id })

        // Delete associated room numbers
        await RoomNumber.deleteMany({ room_id: room._id })

        // Delete the room itself
        return Room.findByIdAndDelete(room._id)
      });

      // Wait for all room deletions to complete
      await Promise.all(roomDeletionPromises);

     


 console.log("roomDeletionPromises success  ",roomDeletionPromises )

      return NextResponse.json({
        success: true,
        message: "Room type and all associated data deleted successfully",
        deletedRoomType: deletedRoomType,
        deletedRoomsCount: rooms.length,
      });
    } catch (error) {
     
      throw error;
    }
  } catch (err) {



console.log("err=========",err)

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
