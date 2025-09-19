import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send a reset password email here
    // For now, we'll just simulate the submission
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-primary-green hover:text-primary-green-dark"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 bg-primary-green rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">SH</span>
            </div>
            <span className="text-2xl font-bold text-primary-green">
              SalesHostel
            </span>
          </Link>
        </div>

        <h2 className="text-center text-3xl font-bold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSubmitted ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Check your email
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                We've sent a password reset link to <span className="font-medium">{email}</span>.
                Please check your inbox and follow the instructions.
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="font-medium text-primary-green hover:text-primary-green-dark"
                >
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Input
                label="Email address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="Enter your email"
              />

              <Button
                type="submit"
                className="w-full"
                size="large"
              >
                Send reset link
              </Button>

              <div className="text-sm text-center">
                <Link
                  to="/login"
                  className="font-medium text-primary-green hover:text-primary-green-dark"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;