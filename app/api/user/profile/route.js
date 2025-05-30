
// Import necessary modules and functions
import { NextResponse } from "next/server";  // For sending responses in Next.js API routes
import dbConnect from "@/utils/dbConnect";  // Function to connect to the MongoDB database
import User from "@/model/user";  // User model to interact with the MongoDB users collection
import bcrypt from "bcrypt";  // For hashing the password before saving it to the database
import { getServerSession } from "next-auth/next";  // Function to get the session information (from NextAuth)
import { authOptions } from "@/utils/authOptions";  // Authentication options for NextAuth configuration

// POST handler for updating user information (e.g., profile update)
export async function POST(req) {
  await dbConnect();  // Connect to the MongoDB database

  const session = await getServerSession(authOptions);  // Get the session to verify if the user is logged in
  const { name, email, password, profileImage, mobileNumber, // User's mobile number
    address, // User's address
    country, // User's country 
     } = await req.json();  // Parse the request body for user data

  try {
    // If the user is not authenticated (no user ID in the session), return a 401 Unauthorized error
    if (!session?.user?._id) {
      return NextResponse.json({ err: "Not authenticated" }, { status: 401 });
    }

    // Hash the password using bcrypt before updating the user's password in the database
    let updatedUser = await User.findByIdAndUpdate(
      session?.user?._id,  // Find the user by their ID (from the session)
      {
        name,  // Update the user's name
        password: await bcrypt.hash(password, 10),  // Hash the new password
        image: profileImage,  // Update the user's profile image

        mobileNumber, // User's mobile number
        address, // User's address
        country, // User's country

      },
      { new: true }  // Ensure the updated document is returned
    );

    // If the user is not found or the update fails, return a 404 Not Found error
    if (!updatedUser) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    // Log the updated user object (for debugging purposes)
    console.log(updatedUser);

    // Return a successful response with the updated user data
    return NextResponse.json(
      { msg: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    // Log any errors for debugging purposes
    console.log(err);

    // Return a 500 Internal Server Error with the error message if any exception occurs
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// GET handler for fetching user information
export async function GET(req) {
  await dbConnect();  // Connect to the MongoDB database

  const session = await getServerSession(authOptions);  // Get the session to verify if the user is logged in

  try {
    // If the user is not authenticated (no user ID in the session), return a 401 Unauthorized error
    if (!session?.user?._id) {
      return NextResponse.json({ err: "Not authenticated" }, { status: 401 });
    }

    // Fetch the user from the database using the ID from the session
    const user = await User.findOne({ _id: session?.user?._id });

    // Log the user object (for debugging purposes)
    console.log(user);

    // Return the user data as the response
    return NextResponse.json(user);
  } catch (err) {
    // Log any errors for debugging purposes
    console.log(err);

    // Return a 500 Internal Server Error with the error message if any exception occurs
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



