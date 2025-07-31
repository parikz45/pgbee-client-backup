"use client";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupPage() {
        const router = useRouter();
  return (
    <div className="relative min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center overflow-hidden">
      {/* Logo Heading */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 mt-4">
        <Image src="/PgBee.png" alt="PgBee Logo" width={120} height={50} />
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl z-10">
        {/* Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
          <button className="w-1/2 py-2 bg-black text-white font-medium">
            Sign up
          </button>
          <button onClick={() => router.push("/auth/login")} className="w-1/2 py-2 bg-white text-black font-medium">
            Log in
          </button>
        </div>

      
        {/* <button className="w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded-xl mb-6 hover:bg-gray-100">
          <FcGoogle size={24} />
          Sign up with Google
        </button>

     
        <div className="flex items-center justify-center mb-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div> */}

        {/* First and Last Name */}
        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label className="block text-sm mb-1 text-gray-700">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1 text-gray-700">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-2">
          <label className="block text-sm mb-1 text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 mb-6 text-sm">
          <input type="checkbox" className="mt-1" />
          <p className="text-gray-700">
            By creating an account, I agree to the{" "}
            <a href="#" className="text-blue-600 underline">Terms of use</a> and{" "}
            <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800">
          Sign Up
        </button>
      </div>
    </div>
  );
}
