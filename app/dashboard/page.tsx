"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  if (status === "loading") {
    return <div>loading</div>;
  }
  if (!session) {
    router.push("/login");
    return;
  }
  console.log(session);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/url/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setResponseMessage(`Your url has shortened: ${data.shortUrl}`);
  };
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="pt-5">
        <div className="flex justify-center">
          <label>
            Link:{" "}
            <input
              className=" border-black border-2"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <div className="flex justify-center pt-5">
          <Button type="submit">Short the Link</Button>
        </div>
        <p className="text-center pt-5">{responseMessage}</p>
      </form>
    </div>
  );
}
