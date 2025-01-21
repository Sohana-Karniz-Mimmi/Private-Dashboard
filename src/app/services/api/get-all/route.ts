import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/connectDB"; 


export async function GET(req: Request) {
  const url = new URL(req.url);
  const { search = "", size = 10, page = 1, filter } = Object.fromEntries(url.searchParams.entries());

  const limit = parseInt(size as string);
  const skip = (parseInt(page as string) - 1) * limit;

  const query: { 
    $or: { title: { $regex: string; $options: string } }[]; 
    productName?: string 
  } = {
    $or: [
      { title: { $regex: search, $options: 'i' } },
    ],
  };

  if (filter) {
    query.productName = filter;
  }

  try {
   
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: 'Failed to connect to database' }, { status: 500 });
    }

    const totalProducts = await db.collection('products').countDocuments(query);
    const products = await db
      .collection('products')
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    const allProducts = await db.collection('products').find().toArray();

    return NextResponse.json({
      products,
      totalProducts,
      allProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page as string),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



