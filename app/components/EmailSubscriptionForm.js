"use client";

import { BellRing } from "lucide-react";
import { useState } from "react";

export default function EmailSubscriptionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const subscribeHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageType("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    } else {
      setEmailError("");
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setMessageType("success");
        setName("");
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
    if (emailError && validateEmail(e.target.value)) {
      setEmailError("");
    }
  };

  return (
    <div className="flex items-center justify-center px-2 xs:px-4 sm:px-0 mt-6 sm:mt-10">
      <div className="w-full xs:w-[90%] sm:w-[80%] md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white dark:bg-gray-900 dark:text-white backdrop-blur-md rounded-2xl border-2 border-[#ff4a4a] shadow-2xl p-4 sm:p-8 transition hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_40px_rgba(255,74,74,0.2)]">
        <h2 className="flex items-center gap-3 text-lg sm:text-2xl font-bold text-center text-[#1f2937] dark:text-white mb-4 sm:mb-6">
          <BellRing className="text-[#ff4a4a]" /> Subscribe for Issue Updates
        </h2>

        <form onSubmit={subscribeHandler} className="space-y-3 sm:space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff4a4a] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleOnChange}
              placeholder="you@example.com"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff4a4a] focus:border-transparent"
              aria-describedby="email-error"
            />
            {emailError && (
              <p id="email-error" className="text-red-500 text-xs mt-2">
                {emailError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-200 ${
              isLoading
                ? "bg-[#ff2a2a] cursor-not-allowed"
                : "bg-[#ff4a4a] hover:bg-[#ff2e2e]"
            }`}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center text-xs sm:text-sm font-medium ${
              messageType === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}