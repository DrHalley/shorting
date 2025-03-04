"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") {
      return <div>loading</div>;
    }
    if (!session) {
      router.push("/login");
      return;
    }
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
      <form onSubmit={handleSubmit}>
        <label>
          Link
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </label>
        <button type="submit">Short the Link</button>
        {responseMessage}
      </form>
    </div>
  );
}
