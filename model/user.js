// Importing the mongoose library which allows us to define schemas and interact with MongoDB
import mongoose from "mongoose";

// Defining the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // 'name' field: required string, stores the user's name
    name: {
      type: String,
      required: true,
    },

    // 'email' field: required and must be unique, stores the user's email address
    email: {
      type: String,
      unique: true,
      required: true,
    },

    // 'password' field: required string, stores the hashed user password
    password: {
      type: String,
    },

    // 'photo' field: optional string, stores the path or URL to the user's profile photo
    image: {
      type: String,
      default: null,
    },

    mobileNumber: { type: String, unique: true, sparse: true },
    phoneVerified: { type: Boolean, default: false },

   
    // 'role' field: only allows 'admin' or 'user', defaults to 'user'
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

   
    resetCode: {
      data: String,
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000), // 10
        // minutes in milliseconds
      },
    },
  },
  {
    // This option automatically adds 'createdAt' and 'updatedAt' fields to track when the document is created or updated
    timestamps: true,
  }
);

// Exporting the User model
// If the model already exists (e.g., in hot-reload environments), use the existing one to avoid errors
export default mongoose.models.User || mongoose.model("User", userSchema);
