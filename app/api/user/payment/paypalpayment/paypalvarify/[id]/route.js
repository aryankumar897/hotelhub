// Import necessary modules and functions
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/model/booking";




import paypal from "@paypal/checkout-server-sdk"; // Import PayPal SDK for handling PayPal transactions

// Create PayPal environment for Sandbox (test environment)
let environment = new paypal.core.SandboxEnvironment(
  "AceW9nJb3-RlOq1F9qpl40eCvABcWpTtxCO5rTu47RpdFOoAiQGJSRRKqAPVodkMWTUbVCAyNpBRaZDL", // PayPal client ID (Sandbox)
  "EHGdvjb7JZ2dnhivVEyI_LAJPEWLxOzkxcFkcivqc_HH4nnqUbcYscfqVsOLwxbqiFY7OqHMJkluJoT0" // PayPal client secret (Sandbox)
);

// Create a PayPal HTTP client to execute requests
let client = new paypal.core.PayPalHttpClient(environment);



export async function GET(req  ,context) {
  await dbConnect();

  const {id}=await  context?.params
  try {
    
   

  // Create a PayPal OrdersCaptureRequest object using the PayPal order ID from the context
    const request = new paypal.orders.OrdersCaptureRequest(id);
    request.requestBody({}); // Empty body as no additional data is needed for the capture request

    // Execute the PayPal request to capture the payment
    const response = await client.execute(request);
    console.log("response  xxxx", response); // Log the response for debugging

    // Extract the transaction reference ID from the PayPal response
    const bookingId = response?.result?.purchase_units[0].reference_id;

  

    // Check if payment is successful
    if (response?.result?.status === "COMPLETED") {
      // Update the booking with payment details
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          transaction_id: response.result.id, // Use payment._id or payment.id as transaction_id
          payment_status: "1", // Or you can use "completed", "success", etc.
        },
        { new: true } // Return the updated document
      );

      if (!updatedBooking) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      }

      console.log("Updated booking:", updatedBooking);
      
      return NextResponse.json(
        { success: "Payment successful and booking updated" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { failed: "Payment failed, try again" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log("payment error", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

//sb-drhne26200129@personal.example.com
