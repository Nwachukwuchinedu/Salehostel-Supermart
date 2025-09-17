import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import FormGroup from "../../../shared/ui/form/FormGroup";
import FormLabel from "../../../shared/ui/form/FormLabel";
import FormError from "../../../shared/ui/form/FormError";
import FormSuccess from "../../../shared/ui/form/FormSuccess";
import Spinner from "../../../shared/ui/components/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In real implementation, call password reset API
      // await authService.requestPasswordReset(email);

      setSuccess(true);
    } catch (error) {
      setError(
        error.message || "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-xs text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Try another email
                </Button>

                <Link to="/customer/login">
                  <Button variant="primary" className="w-full">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormGroup>
              <FormLabel htmlFor="email" required>
                Email Address
              </FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={!!error}
                placeholder="Enter your email address"
                autoFocus
              />
              <FormError message={error} />
            </FormGroup>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Sending Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Remember your password?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/customer/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Back to Sign In
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/customer/register"
                className="text-blue-600 hover:text-blue-500"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
