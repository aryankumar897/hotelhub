import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { useSession } from "next-auth/react";
import BillingDetails from "./BillingDetails";
import BookingSummary from "./BookingSummary";
import PaymentGateways from "./PaymentGateways"; // Import the separated component
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [billingDetails, setBillingDetails] = useState(null);
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data } = useSession();
  const router = useRouter();
  console.log("session data", data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Extract data from URL
      const params = new URLSearchParams(window.location.search);
      const alldata = {
        roomId: params.get("roomId"),
        checkIn: params.get("checkIn"),
        checkOut: params.get("checkOut"),
        guests: parseInt(params.get("guests") || 1),
        rooms: parseInt(params.get("rooms") || 1),
      };

      // Remove data from URL without reloading
      window.history.replaceState({}, "", "/checkout");

      fetchPricingData(alldata);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    const loadHandler = () => {
      console.log("Razorpay script loaded");
    };

    script.addEventListener("load", loadHandler);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", loadHandler);
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpay = async (orderData) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.API}/user/payment/razorpaypayment/razorpay/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
      const data = await response.json();
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data && data.amount * 100,
        currency: "INR",
        name: "Hotel Hub",
        description: "Test Payment",
        order_id: data && data.id,
        handler: function (response) {
          verifyPayment(response.razorpay_payment_id);
          setLoading(false);
        },
        prefill: {
          name: data && data.name,
          email: data && data.email,
        },
        notes: {
          address: "Your Address",
        },
        theme: {
          color: "#4f3aaa",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      setLoading(false);
    } catch (error) {
      console.log("Error initiating payment:", error);
      setLoading(false);
    }
  };

  const verifyPayment = async (paymentId) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/payment/razorpaypayment/razorpayverify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ razorpay_payment_id: paymentId }),
        }
      );
      const data = await response.json();
      if (data?.err) {
        router.push("/cancel");
        setLoading(false);
      } else {
        toast.success(data?.success);
        router.push("/dashboard/user");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleStripe = async (orderData) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/payment/stripepayment/stripe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
      } else {
        window.location.href = data.id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaypal = async (orderData) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/payment/paypalpayment/paypal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("paypal payment failed");
      } else {
        router.push(data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPricingData = async (bookingData) => {
    try {
      const response = await fetch(`${process.env.API}/user/checkoutdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: bookingData.roomId,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests,
          rooms: bookingData.rooms,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch pricing");

      const result = await response.json();

      setPricingData({
        pricePerNight: result.pricePerNight,
        nights: result.nights,
        subtotal: result.subtotal,
        discountPercent: result.discountPercent,
        discountAmount: result.discountAmount,
        total: result.total,
        rooms: result.rooms,
        guests: result.guests,
        roomTypeName: result.roomTypeName,
        room_id: result?.room_id,
        checkIn: result?.checkIn,
        checkOut: result?.checkOut,
        image: result?.image,
      });
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    // First validate the form
    if (!billingDetails?.isValid) {
      // Find the first error to show in alert
      const errorField = Object.entries(billingDetails?.data || {}).find(
        ([key, value]) => key !== "country" && (!value || value.trim() === "")
      );

      if (errorField) {
        alert(`Please fill in ${errorField[0]} correctly`);
      } else {
        alert("Please fill in all required fields correctly");
      }
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Prepare order data
    const orderData = {
      ...pricingData,
      billingDetails: billingDetails.data,
      paymentMethod: selectedPaymentMethod,
    };

    try {
      // Call the appropriate payment handler based on selected method
      switch (selectedPaymentMethod.toLowerCase()) {
        case "stripe":
          await handleStripe(orderData);
          break;
        case "razorpay":
          await handleRazorpay(orderData);
          break;
        case "paypal":
          await handlePaypal(orderData);
          break;
        default:
          // For other payment methods or direct orders without payment processing
          const response = await fetch(`${process.env.API}/user/place-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to place order");
          }

          const result = await response.json();
          alert(`Order placed successfully!\nOrder ID: ${result.orderId}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Order failed: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <CircularProgress
          size={80}
          sx={{
            color: "purple",
            animation: "spin 2s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(180deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <BillingDetails onBillingDetailsChange={setBillingDetails} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BookingSummary pricingData={pricingData} />
          <PaymentGateways
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            handlePlaceOrder={handlePlaceOrder}
          />
        </Grid>
      </Grid>
    </Container>
  );
}