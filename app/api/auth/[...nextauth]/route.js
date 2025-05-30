

// Import necessary modules
import NextAuth from "next-auth";  // Import NextAuth.js for authentication handling in Next.js applications
import { authOptions } from "@/utils/authOptions";  // Import the authentication options from a separate file

// Initialize the NextAuth handler with the provided authentication options
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };














// import NextAuth from "next-auth";

// import { authOptions } from "@/utils/authOptions"

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }