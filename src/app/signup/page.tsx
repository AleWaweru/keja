"use client";

import { Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import google from "../../../public/google2.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user.name || !user.email || !user.password) {
        setError("Please fill in all the fields");
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("Invalid email address");
        return;
      }
      const res = await axios.post("/api/register", user);
      console.log(res.data);
      if (res.status == 200 || res.status == 201) {
        console.log("User added successfully");
        setError("");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className=" bg-[#eff1f6] flex justify-center items-center">
      <div className="bg-slate-200 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm">Full Name</label>
            <div className="flex items-center bg-white rounded border border-gray-300 py-2 px-4 mt-1">
              <User className="h-6 w-6 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="ml-2 outline-none flex-grow"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm">Email Address</label>
            <div className="flex items-center bg-white rounded border border-gray-300 py-2 px-4 mt-1">
              <Mail className="h-6 w-6 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="ml-2 outline-none flex-grow"
                placeholder="example@example.com"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password</label>
            <div className="flex items-center bg-white rounded border border-gray-300 py-2 px-4 mt-1">
              <Lock className="h-6 w-6 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="ml-2 outline-none flex-grow"
                placeholder="********"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 w-[100%] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
          <div className="text-center text-sm">
            <span>Already have an account?</span>{" "}
            <Link href="/api/auth/signin" className="text-blue-500 hover:underline">Sign In</Link>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => signIn("google")}
              className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 mt-2"
            >
              <Image src={google} alt="Google Logo" width={20} height={20} className="mr-2" />
              Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
