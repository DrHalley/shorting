"use client";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useState } from "react"; // Server action'u içe aktar

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess(true);
      setError(null);
    } else {
      setSuccess(false);
      setError(data.error || "An error occurred");
    }
  };

  return (
    <div className="flex-col">
      <Navbar />
      <div className="flex justify-center pt-30 ">
        <form
          onSubmit={handleSubmit}
          className="flex-col w-80 h-50 pt-5p py-5 justify-center shadow-2xl border-2 rounded-2xl"
        >
          <div className="pb-1">
            <label>
              <div>
                <p className="text-sm">Email</p>
              </div>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border-black border-2 rounded-2xl focus:outline-0"
              />
            </label>
          </div>

          <div className="pb-5">
            <label>
              <div>
                <p className="text-sm">Password</p>
              </div>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="border-black border-2 rounded-2xl focus:outline-0"
              />
            </label>
          </div>
          <div className="flex justify-center">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <div className="pt-5">
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className=" underline text-blue-400">
            {" "}
            Here
          </Link>{" "}
          create one
        </p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
