"use client";
import {User} from "@prisma/client";
import {SafeUser} from "../../types/index";
import React from "react";
import Link from "next/link";
import {signOut} from "next-auth/react";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const Navbar = ({currentUser}: UserMenuProps) => {
  return (
    <header>
      <nav className="bg-gray-200 flex justify-between px-4 py-6 shadow-xl">
        <div className="">{currentUser?.name}</div>

        <div className="flex gap4">
          <Link href="/home">Home</Link>
          <Link href="/create">Create</Link>

          {currentUser ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <Link href="/register">Register</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
