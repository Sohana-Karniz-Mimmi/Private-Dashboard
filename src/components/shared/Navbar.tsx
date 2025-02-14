"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface NavItem {
  title: string;
  path: string;
}

const Navbar: React.FC = () => {
  const session = useSession();

  const navItems: NavItem[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Contacts",
      path: "/contacts",
    },
  ];

  return (
    <div className="bg-base-100 text-slate-900 border-b-[1px] py-2">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <Link href={"/"}>
            <h2 className="text-2xl text-black font-bold">PrivateDashboard</h2>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                className="font-semibold hover:text-primary duration-300"
                href={item.path}
                key={item.path}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex space-x-3 items-center">
            {session.status === "loading" && <h6>Loading....</h6>}
            {session.status === "unauthenticated" && (
             <div >
               <Link href="/signup" className="btn btn-primary text-white px-8 mr-2">
              Register
            </Link>
              <Link href="/login" className="btn btn-primary text-white px-8">
                Login
              </Link>
             </div>
            )}
            {session.status === "authenticated" && (
              <button
                className="btn btn-outline btn-ghost px-8"
                onClick={() => signOut()}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
