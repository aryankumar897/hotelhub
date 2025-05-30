

// Declares the script as a server-side script in Next.js (for server-side API handling)
"use server";

// Import the GoogleGenerativeAI package to interact with Google's generative AI API
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Create an instance of the GoogleGenerativeAI with the provided API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Define an async function `runAi` which will generate content using the AI model
export async function runAi(prompt) {
  // Specify the AI model you want to use (in this case, "gemini-1.5-flash")
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Use the model to generate content based on the given prompt
  const result = await model.generateContent(prompt);

  // Extract the response from the generated content
  const response = await result.response;

  // Get the generated text from the response object
  const text = response.text();

  // Return the generated text to the caller of the function
  return text;
}


























// "use server";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// export async function runAi(prompt) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   // const prompt = " write  newspost for google";
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();


//   return text;
// }