import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/model/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

import Booking from "@/model/booking";
import paypal from '@paypal/checkout-server-sdk'; // Import PayPal SDK for handling PayPal transactions
import RoomBookedDate from "@/model/RoomBookedDate";



// Set up PayPal environment with client ID and secret (sandbox mode for testing)
let environment = new paypal.core.SandboxEnvironment(
  "AceW9nJb3-RlOq1F9qpl40eCvABcWpTtxCO5rTu47RpdFOoAiQGJSRRKqAPVodkMWTUbVCAyNpBRaZDL", // PayPal client ID (Sandbox)
  "EHGdvjb7JZ2dnhivVEyI_LAJPEWLxOzkxcFkcivqc_HH4nnqUbcYscfqVsOLwxbqiFY7OqHMJkluJoT0" // PayPal client secret (Sandbox)
);

// Create PayPal client to interact with the PayPal API
let client = new paypal.core.PayPalHttpClient(environment);


function generateBookingCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function generateDateRange(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);

  while (current <= new Date(endDate)) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export async function POST(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  console.log("sessionxxxxxxxxxxxxxxxxx", session);

  if (!session?.user?._id) {
    return NextResponse.json({ err: "Not authenticated" }, { status: 401 });
  }

  try {
    const {
      pricePerNight,
      nights,
      subtotal,
      discountPercent,
      discountAmount,
      total,
      rooms,
      guests,
      roomTypeName,
      room_id,
      checkIn,
      checkOut,
      image,
      billingDetails,
      paymentMethod,
    } = await req.json();


    const { country, name, email, phone, address, state, zipCode } =
      billingDetails;


    const newBooking = new Booking({
      rooms_id: room_id,
      user_id: session?.user._id,
      check_in: checkIn,
      check_out: checkOut,
      person: guests,
      number_of_rooms: rooms,
      total_night: nights,
      actual_price: pricePerNight,
      subtotal,
      discount: discountAmount,
      total_price: parseFloat(total.toFixed(2)),
      payment_method: paymentMethod,
      transaction_id: "",
      payment_status: 0,
      name,
      email,
      phone,
      country,
      state,
      zip_code: zipCode,
      address,
      code: generateBookingCode(),
      status: "inactive",
    });

    await newBooking.save();

    if (!room_id || !newBooking?._id || !checkIn || !checkOut) {
      return NextResponse.json({ message: "Missing fields" });
    }

    const dates = generateDateRange(checkIn, checkOut);

    const bookedDates = dates.map((date) => ({
      booking_id: newBooking?._id,
      room_id,
      book_date: date,
    }));

    await RoomBookedDate.insertMany(bookedDates);


       // Set up the PayPal order creation request
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation"); // Indicate that the API should return a representation of the order

    // Define the request body for the PayPal order creation
    request.requestBody({
      application_context: {
        // Redirect URLs for successful and canceled payments
        return_url: 'http://localhost:3000/dashboard/user/paypal/success', 
        cancel_url: 'http://localhost:3000/dashboard/user/paypal/cancel',
      },
      intent: 'CAPTURE', // Intent to capture the payment after approval
      purchase_units: [{
        // Associate the course with the PayPal order using reference ID
        reference_id:   newBooking&& newBooking?._id.toString(), 
        amount: {
          currency_code: 'USD', // Set the currency as USD
          value: Math.round(total), // Set the course price
        },
      }]
    });

    // Execute the PayPal order creation request
    const order = await client.execute(request);
    console.log('order===>', order.result.links); // Log the PayPal order response links for debugging

    // Return the approval URL (second link) from the PayPal order response to the client
    return NextResponse.json({ id: order?.result.links[1].href });



  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      { err: err.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
