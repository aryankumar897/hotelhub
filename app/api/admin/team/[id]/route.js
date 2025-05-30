// Importing NextResponse from next/server to handle HTTP responses
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the Team model to interact with the "Team" collection
import Team from "@/model/team";

// PUT method for updating an existing Team member
export async function PUT(req, context) {
  // Establish a connection to the database
  await dbConnect();

  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Team member ID is required." }, { status: 400 });
  }

  try {
    // Parsing the incoming request body as JSON
    const body = await req.json();

    // Finding the Team by its ID and updating it with the new data
    const updatingTeam = await Team.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!updatingTeam) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    // Returning the updated Team as a JSON response
    return NextResponse.json(updatingTeam);
  } catch (err) {
    console.error("Error updating team member:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}





// DELETE method for deleting a Team
export async function DELETE(req, context) {
  // Establishing a connection to the database
  await dbConnect();

  try {
    // Finding the Team by its ID (from context.params.id) and deleting it
    const deletingTeam = await Team.findByIdAndDelete(
      context.params.id // The Team ID to delete, coming from the URL parameters
    );

    // Returning the deleted Team as a JSON response
    return NextResponse.json(deletingTeam);
  } catch (err) {

 console.log("error deleting team  member",  err)


    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}







