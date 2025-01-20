import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

// Define the user data type
interface User {
  name: string;
  email: string;
  password: string;
}

export const POST = async (request: NextRequest) => {
  const newUser: User = await request.json(); // Type the incoming data
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    // Check if the user already exists
    const exist = await userCollection.findOne({ email: newUser.email });
    console.log(exist);

    if (exist) {
      // Return response if user already exists
      return NextResponse.json({ message: "User Exists" }, { status: 304 });
    }

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);

    // Insert the new user into the database
    const resp = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};
