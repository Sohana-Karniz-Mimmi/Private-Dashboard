import { connectDB } from "@/lib/connectDB";
import { services } from "@/lib/services";
import { NextResponse } from "next/server";
import { Db, Collection } from "mongodb";

export const GET = async (): Promise<NextResponse> => {
  const db: Db | null = await connectDB();
  if (!db) {
    return NextResponse.json({ message: "Failed to connect to database" });
  }

  const productCollection: Collection = db.collection('products');

  try {
    await productCollection.deleteMany({});
     await productCollection.insertMany(services);
    return NextResponse.json({ message: "Seeded Successfully" });
  } catch (error) {
    return NextResponse.json({ message: "No Data Found", error:error });
  }
};