import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import BlogPost from "@/model/blog";
import slugify from "slugify";

// GET all blog posts
export async function GET() {
  await dbConnect();

  try {
    // Fetch all posts sorted by creation date (newest first)
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST create new blog post
export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { title, description, image, category } = body;

  try {
    // Create new post with auto-generated slug
    const post = await BlogPost.create({
      title,
      slug: slugify(title, { lower: true, strict: true }),
      description,
      image,
      categories: category,
    });

    return NextResponse.json(post);
  } catch (err) {
    console.log("err", err);
    // Handle duplicate slug error specifically
    if (err.code === 11000) {
      return NextResponse.json(
        { err: "A post with this title already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
