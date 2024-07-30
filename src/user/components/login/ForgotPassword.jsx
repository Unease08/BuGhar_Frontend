import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simple validation for email
    if (!email) {
      setError(
        "Please include a valid email address so we can get back to you"
      );
      return;
    }

    setError("");
    // Handle the reset password logic here
    console.log("Reset password for email:", email);
  };

  return (
    <div className="h-screen w-full bg-n-11">
      <main id="content" role="main" className="max-w-md mx-auto p-6">
        <div className="mt-40 bg-n-14 rounded-xl shadow-lg dark:border-gray-700 border-2">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-white">
                Forgot password?
              </h1>
              <h3 className="mt-2 dark:text-white">
                Remember Your Password?
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span className=" ml-3 bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    <Link to="/login">Login here</Link>
                  </span>
                </a>
              </h3>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
