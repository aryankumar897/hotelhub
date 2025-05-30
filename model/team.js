// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Create a new Schema for the "Team" collection
const teamSchema = new mongoose.Schema(
  {
    // Define the "image" field which will store a string (like a URL)
    image: {
      type: String,        // Data type is String
      required: true,      // This field must be provided (cannot be empty)
    },
    // Define the "name" field for the team member's name
    name: {
      type: String,        // Data type is String
      required: true,      // Must be provided
    },
    // Define the "position" field for the team member's job title or role
    position: {
      type: String,        // Data type is String
      required: true,      // Must be provided
    },
  },
  { 
    timestamps: true      // Automatically adds "createdAt" and "updatedAt" fields
  }
);

// Export the "Team" model
// If "Team" model already exists (in case of hot reloading in Next.js, etc.), use it
// Otherwise, create a new model called "Team" using the teamSchema
export default mongoose.models.Team || mongoose.model("Team", teamSchema);
