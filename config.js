

// Database connection string for MongoDB (local instance)
const DB_URI = "mongodb://127.0.0.1:27017/hotel"; // Connects to a local MongoDB instance on port 27017

// Base API URL for making backend requests (used in the frontend or other services)
const API = "http://localhost:3000/api"; // Refers to the local backend API

// Cloudinary settings for handling image uploads
const CLOUDINARY_CLOUD_NAME = "dxhzy8hjp"; // Cloud name for Cloudinary account
const CLOUDINARY_API_KEY = "732193517963228"; // API key for Cloudinary authentication
const CLOUDINARY_API_SECRET = "laHrHWwDnUr_wYP7jdsz8Z7XYyE"; // API secret for Cloudinary (⚠️ Should be kept private)

// Client URL for frontend applications
const CLIENT_URL = "http://localhost:3000"; // Frontend runs on localhost:3000

// Google API key for various services (e.g., Maps, YouTube, OAuth, etc.)
const GOOGLE_API_KEY = "AIzaSyB3ASF_RfqwnLYVMgLe71l45MWYPW65yw4"; // ⚠️ API key should be kept secure

// NextAuth secret for encrypting JWT tokens
const NEXTAUTH_SECRET = "YGHIUGH78YT845U7YTH45IU796YH4658"; // ⚠️ Must be kept secret, used for session encryption

// Google OAuth credentials for authentication
const GOOGLE_CLIENT_ID = "201676020129-oijeeo9b6j6pm1p74q9bkp5n6q7tm9lc.apps.googleusercontent.com"; 
const GOOGLE_CLIENT_SECRET = "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"; // ⚠️ Must be kept secret


// Razorpay API keys for handling payments
const RAZORPAY_KEY_ID = "rzp_test_x4qlAHmRKRobPQ"; // Public key for Razorpay
const RAZORPAY_KEY_SECRET = "5e6j0wwfasQGYf7iEOG7OSbx"; // ⚠️ Must be kept secret

// PayPal API keys for handling payments
const PAYPAL_CLIENT_ID = "AWFzSsbK-t-cIR6tesNg0-T4X1iJzRC8f3DEl_F_zBu8zCK_EYVfV-MpIabxdcDjGue9OVGx4JdqP5Sa"; 
const PAYPAL_CLIENT_SECRET = "EAgttqS6ir0zGY7sRcSgzhaw-xxatmRLYq4WvyFZtGlHh59I9iArNCfvCG-cDWzlvfUSYi4cocZ0LN1A"; // ⚠️ Must be kept secret

// Exporting all configurations as a module
module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  GOOGLE_API_KEY,
  CLIENT_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
 
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_KEY_ID,
};
































// const DB_URI = "mongodb://127.0.0.1:27017/lms";

// const API = "http://localhost:3000/api";

// CLOUDINARY_CLOUD_NAME = "dxhzy8hjp",
//   CLOUDINARY_API_KEY = "732193517963228",
//   CLOUDINARY_API_SECRET = "laHrHWwDnUr_wYP7jdsz8Z7XYyE",
//   CLIENT_URL = "http://localhost:3000";

// GOOGLE_API_KEY = "AIzaSyB48waIDwpCTAGsthTANJDEupw5FcUq3QE";

// NEXTAUTH_SECRET = "YGHIUGH78YT845U7YTH45IU796YH4658";

// CLIENT_URL = "http://localhost:3000";

// GOOGLE_CLIENT_ID =
//   "201676020129-oijeeo9b6j6pm1p74q9bkp5n6q7tm9lc.apps.googleusercontent.com";
// GOOGLE_CLIENT_SECRET ="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";
// GITHUB_CLIENT_ID = "Ov23lir416Bn2SCOCOmT";
// GITHUB_CLIENT_SECRET = "7790b4bb975e9c586a1a55eac31cf1a76cc0b8a9";
// FACEBOOK_CLIENT_ID = "";
// FACEBOOK_CLIENT_SECRET = "";
// LINKEDIN_CLIENT_ID = "1270802720441368596";
// LINKEDIN_CLIENT_SECRET = "zk1xRzvjYRB3srOnN-FuMr4CpqwM3i7z";

// RAZORPAY_KEY_ID = "rzp_test_dKqs0H1Gi3Kvf6"
// RAZORPAY_KEY_SECRET = "w1JGtUoVg4BsuN2EpjtmGp24"

// PAYPAL_CLIENT_ID="AWFzSsbK-t-cIR6tesNg0-T4X1iJzRC8f3DEl_F_zBu8zCK_EYVfV-MpIabxdcDjGue9OVGx4JdqP5Sa"
// PAYPAL_CLIENT_SECRET="EAgttqS6ir0zGY7sRcSgzhaw-xxatmRLYq4WvyFZtGlHh59I9iArNCfvCG-cDWzlvfUSYi4cocZ0LN1A"




// module.exports = {
//   DB_URI,
//   API,
//   NEXTAUTH_SECRET,
//   CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET,
//   GOOGLE_API_KEY,
//   CLIENT_URL,
//   GOOGLE_CLIENT_ID ,
//   GOOGLE_CLIENT_SECRET,
//   GITHUB_CLIENT_ID ,
//   GITHUB_CLIENT_SECRET,
//   FACEBOOK_CLIENT_ID ,
//   FACEBOOK_CLIENT_SECRET,
//   LINKEDIN_CLIENT_ID ,
//   LINKEDIN_CLIENT_SECRET,
//   PAYPAL_CLIENT_SECRET,
//   PAYPAL_CLIENT_SECRET,
//   RAZORPAY_KEY_SECRET,
//   RAZORPAY_KEY_ID ,




// };