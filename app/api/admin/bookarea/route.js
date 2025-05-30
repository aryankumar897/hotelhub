// Importing NextResponse for handling HTTP responses in Next.js
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing Promo model to interact with the "Promo" collection
import BookArea from "@/model/bookarea";

// GET function to fetch the single promo document
export async function GET() {
  // Establishing a connection to the database
  await dbConnect();

  try {
    // Since we only have one document, we'll either:
    // 1. Find the first one (if exists)
    // 2. Or return a default structure if none exists
    let promo = await BookArea.findOne({});
    
    // If no promo exists, return a default structure
    if (!promo) {
      promo = {
        shortTitle: "",
        mainTitle: "",
        shortDesc: "",
        linkUrl: "",
    photoUrl: ""
      };
    }

    // Returning the promo as a JSON response
    return NextResponse.json(promo);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// PUT function to update the single promo document
export async function PUT(request) {
  // Establishing a connection to the database
  await dbConnect();

  try {
    // Parse the incoming request body
    const body = await request.json();
    const { shortTitle, mainTitle, shortDesc, linkUrl, photoUrl } = body;

    // Find the existing promo document (if any)
    let promo = await BookArea.findOne({});

    if (promo) {
      // Update existing document
      promo.shortTitle = shortTitle;
      promo.mainTitle = mainTitle;
      promo.shortDesc = shortDesc;
      promo.linkUrl = linkUrl;
      promo.photoUrl = photoUrl;
      await promo.save();
    } else {
      // Create new document if none exists
      promo = await BookArea.create({
        shortTitle,
        mainTitle,
        shortDesc,
        linkUrl,
        photoUrl
      });
    }

    // Return the updated promo document
    return NextResponse.json({
      message: "Promo updated successfully",
      promo
    });
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}