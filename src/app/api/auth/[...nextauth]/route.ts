import { connectDB } from "@/lib/connectDB";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    rolling: false,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const db = await connectDB();
        if (!db) {
          return null;
        }

        const currentUser = await db.collection("users").findOne({ email });

        if (!currentUser) {
          return null;
        }

        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );

        if (!passwordMatched) {
          return null;
        }

        return {
          id: currentUser._id.toString(),
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image || null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {},
} as NextAuthOptions);

export { handler as GET, handler as POST };
