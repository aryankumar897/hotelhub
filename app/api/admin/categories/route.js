


// Importing NextResponse for handling HTTP responses in Next.js
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing Category model to interact with the "Category" collection
import Category from "@/model/Category";

// Importing slugify to create slugs from category names for SEO-friendly URLs
import slugify from "slugify";

// GET function to fetch all categories
export async function GET() {
  // Establishing a connection to the database
  await dbConnect();

  try {
    // Fetching all categories from the Category collection, sorted by creation date in descending order
    const category = await Category.find({}).sort({ createdAt: -1 });

    // Returning the categories as a JSON response
    return NextResponse.json(category);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST function to create a new category
export async function POST(req) {
  // Establishing a connection to the database
  await dbConnect();

  // Parsing the incoming request body as JSON
  const body = await req.json();

  // Extracting the "name" field from the request body
  const { name } = body;

  try {
    // Creating a new category in the Category collection with the provided name
    // Also generating a slug from the name for better URL structure and SEO
    const category = await Category.create({ name, slug: slugify(name) });

    // Returning the created category as a JSON response
    return NextResponse.json(category);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}


