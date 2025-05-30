import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/model/user";

import nodemailer from "nodemailer";

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "akumar07092000@gmail.com",
    pass: "owjrxyojvsvtkmgy",
  },
});

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { email } = body;
  console.log({ email });

  try {
    const resetCode = generateVerificationCode();

    // Save verification code to user document in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    // Save reset code in the user db
    user.resetCode = {
      data: resetCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes in
    };
    await user.save();

    const resetLink = `http://localhost:3000/reset-password?email=${email}&code=${resetCode}`;

    const mailOptions = {
      to: email, // mail receiver email
      from: "akumar07092000@gmail.com", // mail sending service provider

      subject: "Password Reset Request",
      html: `

<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 40px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">
    
    <!-- Hero Image -->
    <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1200&q=80" alt="Security Banner" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">

    <h2 style="color: #222; text-align: center; margin-bottom: 20px;">🔐 Password Reset Request</h2>

    <p style="color: #333; font-size: 16px;">Hi there,</p>

    <p style="color: #0056b3; font-weight: bold; font-size: 16px;">Your reset code: <span style="background: #e0f0ff; padding: 4px 10px; border-radius: 6px;">${resetCode}</span></p>

    <p style="color: #555; font-size: 15px;">You requested to reset your password. This code is valid for <strong>10 minutes</strong>. Click the button below to reset it:</p>

    <p style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" style="background: linear-gradient(135deg, #007bff, #0056b3); color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">🔁 Reset Password</a>
    </p>

    <p style="color: #888; font-size: 14px;">If you didn’t request a password reset, you can safely ignore this message.</p>

    <p style="color: #333; font-size: 14px;">Thanks,<br><strong>Your Company Team</strong></p>

  </div>
</div>




 `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ msg: "Password reset link sent successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



//https://myaccount.google.com/apppasswords