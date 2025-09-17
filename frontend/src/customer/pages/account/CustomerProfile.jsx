import React, { useState, useEffect } from "react";
import { useAuth } from "../../../shared/hooks/useAuth.jsx";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import FormGroup from "../../../shared/ui/form/FormGroup";
import FormLabel from "../../../shared/ui/form/FormLabel";
import FormError from "../../../shared/ui/form/FormError";
import FormSuccess from "../../../shared/ui/form/FormSuccess";
import Spinner from "../../../shared/ui/components/Spinner";
import Avatar from "../../../shared/ui/components/Avatar";

const CustomerProfile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (profileData.phone && !/^\+?[\d\s-()]+$/.test(profileData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateProfile();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await updateProfile(profileData);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validatePassword();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Simulate API call for password change
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to change password",
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Information", icon: "user" },
    { id: "security", label: "Security", icon: "lock" },
    { id: "preferences", label: "Preferences", icon: "settings" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <Avatar
                src={user?.avatar}
                alt={`${user?.firstName} ${user?.lastName}`}
                size="lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {message.text && (
              <div className="mb-6">
                {message.type === "success" ? (
                  <FormSuccess message={message.text} />
                ) : (
                  <FormError message={message.text} />
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormGroup>
                    <FormLabel htmlFor="firstName" required>
                      First Name
                    </FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      error={!!errors.firstName}
                    />
                    <FormError message={errors.firstName} />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="lastName" required>
                      Last Name
                    </FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      error={!!errors.lastName}
                    />
                    <FormError message={errors.lastName} />
                  </FormGroup>
                </div>

                <FormGroup>
                  <FormLabel htmlFor="email" required>
                    Email Address
                  </FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    error={!!errors.email}
                  />
                  <FormError message={errors.email} />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    error={!!errors.phone}
                    placeholder="+1 (555) 123-4567"
                  />
                  <FormError message={errors.phone} />
                </FormGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormGroup>
                    <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={handleProfileChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                    <select
                      id="gender"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </FormGroup>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <FormGroup>
                  <FormLabel htmlFor="currentPassword" required>
                    Current Password
                  </FormLabel>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.currentPassword}
                  />
                  <FormError message={errors.currentPassword} />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="newPassword" required>
                    New Password
                  </FormLabel>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.newPassword}
                  />
                  <FormError message={errors.newPassword} />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="confirmPassword" required>
                    Confirm New Password
                  </FormLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    error={!!errors.confirmPassword}
                  />
                  <FormError message={errors.confirmPassword} />
                </FormGroup>

                <div className="flex justify-end">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Changing Password...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Email notifications for order updates
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        SMS notifications for delivery updates
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Marketing emails and promotions
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Privacy Settings
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Allow personalized recommendations
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Share data for analytics
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary">Save Preferences</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
