import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import useAuthStore from "../../stores/authStore";
import {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from "../../utils/helpers";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsappNumber: "",
    callNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Validate password in real-time
    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
    }

    // Clear global error
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.whatsappNumber) {
      errors.whatsappNumber = "WhatsApp number is required";
    } else if (!validatePhoneNumber(formData.whatsappNumber)) {
      errors.whatsappNumber = "Please enter a valid Nigerian phone number";
    }

    if (!formData.callNumber) {
      errors.callNumber = "Call number is required";
    } else if (!validatePhoneNumber(formData.callNumber)) {
      errors.callNumber = "Please enter a valid Nigerian phone number";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!passwordValidation.isValid) {
      errors.password = passwordValidation.feedback;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Prepare data for registration
    const registrationData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.toLowerCase().trim(),
      whatsappNumber: formData.whatsappNumber.trim(),
      callNumber: formData.callNumber.trim(),
      password: formData.password,
    };

    try {
      console.log('Attempting registration with data:', registrationData);
      const result = await register(registrationData);
      console.log('Registration result:', result);
      
      // Check if result exists and has success property before accessing it
      if (result && typeof result === 'object' && result.success) {
        // Redirect to home page after successful registration
        navigate("/", { replace: true });
      } else {
        console.error('Registration failed:', result);
        // Handle the case where registration failed but didn't throw an error
        // The error should already be set in the auth store
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Error should already be handled by the auth store
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-green hover:text-primary-green-dark"
          >
            Sign in here
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
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                error={formErrors.firstName}
                required
                placeholder="First name"
              />

              <Input
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                error={formErrors.lastName}
                required
                placeholder="Last name"
              />
            </div>

            <Input
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={formErrors.email}
              required
              placeholder="Enter your email"
            />

            <Input
              label="WhatsApp Number"
              name="whatsappNumber"
              type="tel"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              error={formErrors.whatsappNumber}
              required
              placeholder="e.g., 08012345678"
              helperText="We'll use this for order updates"
            />

            <Input
              label="Call Number"
              name="callNumber"
              type="tel"
              value={formData.callNumber}
              onChange={handleInputChange}
              error={formErrors.callNumber}
              required
              placeholder="e.g., 08012345678"
              helperText="For delivery coordination"
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                error={formErrors.password}
                required
                placeholder="Create a password"
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

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 flex-1 rounded ${
                      passwordValidation.strength === "weak"
                        ? "bg-red-200"
                        : passwordValidation.strength === "medium"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    }`}
                  >
                    <div
                      className={`h-full rounded transition-all duration-300 ${
                        passwordValidation.strength === "weak"
                          ? "bg-red-500 w-1/3"
                          : passwordValidation.strength === "medium"
                          ? "bg-yellow-500 w-2/3"
                          : "bg-green-500 w-full"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      passwordValidation.strength === "weak"
                        ? "text-red-600"
                        : passwordValidation.strength === "medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {passwordValidation.strength}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {passwordValidation.feedback}
                </p>
              </div>
            )}

            <div className="relative">
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={formErrors.confirmPassword}
                required
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ top: "32px", right: "12px" }}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-700">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-primary-green hover:text-primary-green-dark"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-primary-green hover:text-primary-green-dark"
                  >
                    Privacy Policy
                  </Link>
                </label>
                {formErrors.agreeToTerms && (
                  <p className="mt-1 text-red-600 text-xs">
                    {formErrors.agreeToTerms}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="large"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="outline" className="w-full" size="large">
                  Sign in instead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;