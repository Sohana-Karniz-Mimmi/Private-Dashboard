import { MongoClient, Db, ServerApiVersion } from "mongodb";

let db: Db | null = null;

export const connectDB = async (): Promise<Db | null> => {
  if (db) return db;

  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    if (!uri) {
      throw new Error("MongoDB URI is missing in environment variables.");
    }

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    db = client.db('PrivateDashboard');
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return null;
  }
};
