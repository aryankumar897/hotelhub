// Import necessary modules
import { NextResponse } from "next/server"; // Importing Next.js response handler for API routes
import dbConnect from "@/utils/dbConnect"; // Utility function to establish database connection
import User from "@/model/user"; // User model for interacting with the 'User' collection in the database
import bcrypt from "bcrypt"; // Bcrypt for hashing passwords securely

// Main POST function to handle user registration
export async function POST(req) {
  await dbConnect(); // Establish a database connection
  const body = await req.json(); // Parse the incoming JSON request body
  const { name, email, password, phone } = body; // Destructure values from the request body
  console.log({ name, email, password,phone }); // Log the incoming data for debugging

  try {
    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If email exists, return an error response
      return NextResponse.json(
        { err: "Email already in use" },
        { status: 500 }
      );
    }

    // Hash the password securely before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the provided data and hashed password
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      phone,
    }).save(); // Save the new user to the database

    // Return a success message if user is registered successfully
    return NextResponse.json({ msg: "User registered successfully" });
  } catch (err) {
    console.log(err); // Log any errors that occur during the registration process
    // Return an error response with the error message if something goes wrong
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}






