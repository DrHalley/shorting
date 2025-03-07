import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full">
      <Navbar />
      <div className="flex-col">
        <h1 className=" text-6xl text-center pt-50 pb-10">Shorting</h1>
        <h1 className="text-4xl text-center">Short your links</h1>
        <div className=" flex justify-center pt-15">
          <Button asChild variant={"ghost"}>
            <Link href="/dashboard">
              <p className="text-3xl">Start now</p>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
