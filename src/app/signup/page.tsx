"use client";

import { Navbar } from "@/components";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      }).catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen min-w-full flex justify-center items-center p-4">
        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-[#232323] rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign up to 3D Car Designer
          </h2>
          <form className="mt-8 space-y-6" action="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border text-sm rounded-lg block w-full p-2.5 bg-[#232323] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your full name"
                className="border text-sm rounded-lg block w-full p-2.5 bg-[#232323] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign up
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
