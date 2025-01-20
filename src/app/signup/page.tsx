"use client";
import Link from "next/link";

const SignUpPage: React.FC = () => {
  // handleSignUp ফাংশনে টাইপ যুক্ত করা হয়েছে
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newUser = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    console.log(newUser);

      try {
        const resp = await fetch(
          "http://localhost:3000/signup/api",
          {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (resp.status === 200) {
          form.reset(); // ফর্ম রিসেট করে দেয়া হবে
          alert("Sign-up successful!");
        } else {
          alert("Failed to sign up. Please try again.");
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
        alert("An error occurred. Please try again later.");
      }
  };

  return (
    <div className="container px-24 mx-auto py-24">
      <div className=" w-[500px] mx-auto">
        <div className="border-2 p-8">
          <h6 className="text-3xl font-semibold text-primary text-center mb-2">
            Sign Up
          </h6>
          <form onSubmit={handleSignUp}>
            <label htmlFor="name">Name</label> <br />
            <input
              type="text"
              name="name"
              placeholder="your name"
              className="mt-3 w-full input input-bordered"
              required
            />
            <br /> <br />
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
              className="w-full btn btn-primary mt-8 text-lg"
            >
              Sign Up
            </button>
          </form>
          <div>
            <h6 className="my-4 text-center">
              Already have an account?{" "}
              <Link className="text-primary font-semibold" href={"/login"}>
                Sign In
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;