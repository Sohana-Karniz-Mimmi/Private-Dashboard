import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { sendResetEmail } from "@/lib/mail"; 

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const db = await connectDB();
    if (!db) throw new Error("Failed to connect to database");
    
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; 

    // Save reset token to user
    await db.collection("users").updateOne(
      { email },
      { 
        $set: {
          resetToken,
          resetTokenExpiry
        }
      }
    );

    // Send reset email
    await sendResetEmail(email, resetToken);

    return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
} 