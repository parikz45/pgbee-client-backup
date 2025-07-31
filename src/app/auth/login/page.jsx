'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    if (!captchaChecked) {
      alert('Please verify you are not a robot');
      return;
    }

    setIsLoading(true);

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        alert(`Login failed: ${message || 'Unknown error'}`);
        return;
      }

      const { accessToken, refreshToken } = await res.json();

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setShowModal(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center relative">
      {/* Logo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 mt-4">
        <Image src="/PgBee.png" alt="PgBee Logo" width={120} height={50} />
      </div>

      {/* Card */}
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl z-10">
        {/* Toggle Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
          <button
            onClick={() => router.push('/auth/signup')}
            className="w-1/2 py-2 bg-white text-black font-medium"
          >
            Sign up
          </button>
          <button className="w-1/2 py-2 bg-black text-white font-medium">
            Log in
          </button>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-2">
          <label className="block text-sm mb-1 text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            Forgot Your Password?
          </a>
        </div>

        {/* Captcha */}
        <div className="mb-6">
          <label className="block text-sm mb-1 text-gray-700">Verify Captcha</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
            <input
              type="checkbox"
              checked={captchaChecked}
              onChange={() => setCaptchaChecked(!captchaChecked)}
            />
            <span className="text-sm">I’m not a robot</span>
            <img
              src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
              alt="reCAPTCHA"
              className="h-6 ml-auto"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-green-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-gray-700 font-semibold">Login successful!</p>
          </div>
        </div>
      )}
    </div>
  );
}
