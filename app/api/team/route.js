
// Importing NextResponse for handling HTTP responses in Next.js
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing Team model to interact with the "Team" collection
import  Team  from "@/model/team";


// GET function to fetch all Team
export async function GET() {
  // Establishing a connection to the database
  await dbConnect();

  try {
    // Fetching all categories from the Team collection, sorted by creation date in descending order
    const team = await Team.find({}).sort({ createdAt: -1 });

    // Returning the Team as a JSON response
    return NextResponse.json(team);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
