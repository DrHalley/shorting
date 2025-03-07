"use client"; // Client Component olduğunu belirt

import { useState } from "react";
import { signIn } from "next-auth/react"; // next-auth içinden import et

import Navbar from "@/components/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const route = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false, // Sayfa yönlendirmesini kontrol etmek için
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      route.push("/dashboard"); // Başarılı girişte yönlendirme yap
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
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
      <div className="pt-5">
        <p className="text-center">
          Don`t have an account?{" "}
          <Link href="/register" className=" underline text-blue-400">
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
