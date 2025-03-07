"use client";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return;
  }

  return (
    <div className="flex justify-center pt-1 h-1/10 ">
      <nav className="flex justify-between w-3/5 border-2 rounded-3xl shadow-2xl ">
        <div className=" pl-5 flex items-center">
          <Button asChild variant={"ghost"}>
            <Link href="/">
              <p className="text-3xl">Shorting</p>
            </Link>
          </Button>
        </div>

        <div className=" pr-5 flex items-center">
          {session ? (
            <Button
              asChild
              variant="outline"
              className=" bg-green-400 h-15 w-40"
            >
              <Link href="/dashboard">
                <p className="text-2xl font-mono">Dashboard</p>
              </Link>
            </Button>
          ) : (
            <Button
              className=" bg-green-400 h-15 w-40"
              asChild
              variant="outline"
            >
              <Link href="/login">
                <p className="text-2xl font-mono">Login</p>
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
