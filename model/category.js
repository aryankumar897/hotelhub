import mongoose from "mongoose";
// Importing `mongoose` to define a schema and create a model for MongoDB.

//import User from "./user";
// Importing the `User` model, which could be used for tracking who created or updated the category (currently commented out).

const CategorySchema = new mongoose.Schema({
  name: {
    // Defining the `name` fie   ld to store the name of the category.
    type: String,
    // The type is `String`, appropriate for storing textual data like names.
    required: true,
    // This field is required, ensuring that a category name must be provided.
    trim: true,
    // The `trim` option removes any leading or trailing whitespace from the category name.
  },
 
 

}, { timestamps: true });
// Adding the `timestamps` option automatically creates `createdAt` and `updatedAt` fields,
// which track when each category document is created and last modified.

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
// Exporting the `Category` model, which is created from the `CategorySchema`.
// If the `Category` model already exists (to prevent redefinition), it reuses the existing model.