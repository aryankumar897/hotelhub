// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Define the schema for the 'book_areas' collection
const roomtypeSchema = new mongoose.Schema(
  {
    // "main_title" field for the main title text
    name: {
      type: String, // Data type is String
      default: null, // Default value is null
    },
  },
  {
    timestamps: true, // Automatically adds "createdAt" and "updatedAt" fields
  }
);

// Export the "BookArea" model
// If a model called "BookArea" already exists (to avoid overwrite errors during hot-reloading), use it
// Otherwise, create a new model called "BookArea" using the "bookAreaSchema"
export default mongoose.models.RoomType ||
  mongoose.model("RoomType", roomtypeSchema);
