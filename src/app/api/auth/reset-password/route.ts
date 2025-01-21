import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    const db = await connectDB();
    if (!db) throw new Error("Failed to connect to database");

    const user = await db.collection("users").findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = bcrypt.hashSync(password, 14);

    // Update user password and remove reset token
    await db.collection("users").updateOne(
      { resetToken: token },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpiry: "" }
      }
    );

    return NextResponse.json({ message: "Password updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
} 