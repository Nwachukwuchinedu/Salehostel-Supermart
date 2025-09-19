import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import useAuthStore from "../../stores/authStore";
import { validateEmail } from "../../utils/helpers";
import { getRedirectPathByRole } from "../../shared/utils/redirect";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, clearError, user } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear global error
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await login(formData);

    if (result.success) {
      // Redirect based on user role from the login result
      const redirectPath = result.user?.role 
        ? getRedirectPathByRole(result.user.role)
        : from !== "/" ? from : "/";
      
      navigate(redirectPath, { replace: true });
    }
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-primary-green hover:text-primary-green-dark"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Global Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={formErrors.email}
              required
              autoComplete="email"
              placeholder="Enter your email"
            />

            <div>
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                error={formErrors.password}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                style={{ top: "32px", right: "12px" }}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-green hover:text-primary-green-dark"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="large"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to SalesHostel?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/register">
                <Button variant="outline" className="w-full" size="large">
                  Create an account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;