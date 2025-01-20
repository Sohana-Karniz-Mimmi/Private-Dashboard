"use client";
import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const path = searchParams?.get("redirect") || "/";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: true, 
      callbackUrl: path, 
    });

    if (response?.error) {
      console.error("Login failed:", response.error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container px-24 mx-auto py-24">
      <div className=" w-[500px] mx-auto">
        
        <div className="border-2 p-8">
          <h6 className="text-3xl font-semibold text-primary text-center mb-2">
            Sign In
          </h6>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label> <br />
            <input
              type="email"
              name="email"
              placeholder="your email"
              className="mt-3 w-full input input-bordered"
              required
            />
            <br /> <br />
            <label htmlFor="password">Password</label> <br />
            <input
              type="password"
              name="password"
              placeholder="your password"
              className="w-full mt-3 input input-bordered"
              required
            />
            <br />
            <button
              type="submit"
              className="w-full btn btn-primary mt-12 text-lg"
            >
              Sign In
            </button>
          </form>
          <div>
            <h6 className="my-8 text-center">
              Not have an account?{" "}
              <Link className="text-primary font-semibold" href={"/signup"}>
                Sign Up
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
