import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import BlogPost from "@/model/blog";
import slugify from "slugify";

// PUT method for updating a blog post
export async function PUT(req, context) {
  await dbConnect();
  const { id } = context.params;
  const body = await req.json();

  try {
    // Exclude _id and slug from update body (slug should remain consistent)
    const { _id, slug, ...updateBody } = body;

    // If title is being updated, update the slug as well
    if (updateBody.title) {
      updateBody.slug = slugify(updateBody.title, {
        lower: true,
        strict: true,
      });
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      updateBody,
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return NextResponse.json({ err: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (err) {
    // Handle duplicate slug error
    if (err.code === 11000) {
      return NextResponse.json(
        { err: "A post with this title already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE method for deleting a blog post
export async function DELETE(req, context) {
  await dbConnect();
  const { id } = context.params;

  try {
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ err: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
      deletedPost,
    });
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
