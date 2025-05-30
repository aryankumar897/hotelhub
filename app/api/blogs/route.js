import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import BlogPost  from "@/model/blog";

// GET all blog posts
export async function GET() {
  await dbConnect();

  try {
    // Fetch all posts sorted by creation date (newest first)
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err) {
    console.log("error", err)

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

