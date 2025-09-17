import React, { useState, useEffect } from "react";
import Button from "../../../shared/ui/components/Button";
import Input from "../../../shared/ui/components/Input";
import FormGroup from "../../../shared/ui/form/FormGroup";
import FormLabel from "../../../shared/ui/form/FormLabel";
import FormError from "../../../shared/ui/form/FormError";
import FormSuccess from "../../../shared/ui/form/FormSuccess";
import Spinner from "../../../shared/ui/components/Spinner";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    type: "home",
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    isDefault: false,
  });

  const [errors, setErrors] = useState({});

  const addressTypes = [
    { value: "home", label: "Home" },
    { value: "work", label: "Work" },
    { value: "other", label: "Other" },
  ];

  const countries = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
  ];

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock addresses data
      const mockAddresses = [
        {
          id: 1,
          type: "home",
          firstName: "John",
          lastName: "Doe",
          company: "",
          address1: "123 Main Street",
          address2: "Apt 4B",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "US",
          phone: "+1 (555) 123-4567",
          isDefault: true,
        },
        {
          id: 2,
          type: "work",
          firstName: "John",
          lastName: "Doe",
          company: "Tech Corp",
          address1: "456 Business Ave",
          address2: "Suite 200",
          city: "New York",
          state: "NY",
          zipCode: "10002",
          country: "US",
          phone: "+1 (555) 987-6543",
          isDefault: false,
        },
      ];

      setAddresses(mockAddresses);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.address1.trim()) {
      newErrors.address1 = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingAddress) {
        // Update existing address
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editingAddress.id
              ? { ...formData, id: editingAddress.id }
              : addr
          )
        );
        setMessage({ type: "success", text: "Address updated successfully!" });
      } else {
        // Add new address
        const newAddress = { ...formData, id: Date.now() };
        setAddresses((prev) => [...prev, newAddress]);
        setMessage({ type: "success", text: "Address added successfully!" });
      }

      resetForm();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to save address",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowForm(true);
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
      setMessage({ type: "success", text: "Address deleted successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete address" });
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId,
        }))
      );
      setMessage({ type: "success", text: "Default address updated!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update default address" });
    }
  };

  const resetForm = () => {
    setFormData({
      type: "home",
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      phone: "",
      isDefault: false,
    });
    setEditingAddress(null);
    setShowForm(false);
    setErrors({});
  };

  const formatAddress = (address) => {
    const parts = [
      address.address1,
      address.address2,
      `${address.city}, ${address.state} ${address.zipCode}`,
      countries.find((c) => c.value === address.country)?.label,
    ].filter(Boolean);

    return parts.join(", ");
  };

  if (loading && addresses.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Address Book
          </h1>

          {!showForm && (
            <Button onClick={() => setShowForm(true)} variant="primary">
              Add New Address
            </Button>
          )}
        </div>

        {message.text && (
          <div className="mb-6">
            {message.type === "success" ? (
              <FormSuccess message={message.text} />
            ) : (
              <FormError message={message.text} />
            )}
          </div>
        )}

        {showForm ? (
          /* Address Form */
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h2>
              <Button onClick={resetForm} variant="ghost" size="sm">
                Cancel
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormGroup>
                <FormLabel htmlFor="type">Address Type</FormLabel>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {addressTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormLabel htmlFor="firstName" required>
                    First Name
                  </FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
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
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                  />
                  <FormError message={errors.lastName} />
                </FormGroup>
              </div>

              <FormGroup>
                <FormLabel htmlFor="company">Company (Optional)</FormLabel>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="address1" required>
                  Address Line 1
                </FormLabel>
                <Input
                  id="address1"
                  name="address1"
                  type="text"
                  value={formData.address1}
                  onChange={handleChange}
                  error={!!errors.address1}
                  placeholder="Street address"
                />
                <FormError message={errors.address1} />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="address2">
                  Address Line 2 (Optional)
                </FormLabel>
                <Input
                  id="address2"
                  name="address2"
                  type="text"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc."
                />
              </FormGroup>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormGroup>
                  <FormLabel htmlFor="city" required>
                    City
                  </FormLabel>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                  />
                  <FormError message={errors.city} />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="state" required>
                    State
                  </FormLabel>
                  <Input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    error={!!errors.state}
                  />
                  <FormError message={errors.state} />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="zipCode" required>
                    ZIP Code
                  </FormLabel>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={!!errors.zipCode}
                  />
                  <FormError message={errors.zipCode} />
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <FormLabel htmlFor="country">Country</FormLabel>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    placeholder="+1 (555) 123-4567"
                  />
                  <FormError message={errors.phone} />
                </FormGroup>
              </div>

              <div className="flex items-center">
                <input
                  id="isDefault"
                  name="isDefault"
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="isDefault"
                  className="ml-2 text-sm text-gray-700"
                >
                  Set as default address
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" onClick={resetForm} variant="outline">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Saving...
                    </>
                  ) : editingAddress ? (
                    "Update Address"
                  ) : (
                    "Add Address"
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          /* Address List */
          <>
            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(address)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-gray-900">
                      <p className="font-medium">
                        {address.firstName} {address.lastName}
                      </p>
                      {address.company && (
                        <p className="text-gray-600">{address.company}</p>
                      )}
                      <p>{formatAddress(address)}</p>
                      {address.phone && (
                        <p className="text-gray-600">{address.phone}</p>
                      )}
                    </div>

                    {!address.isDefault && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Set as Default
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No addresses saved
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add your addresses to make checkout faster and easier.
                  </p>
                  <Button onClick={() => setShowForm(true)} variant="primary">
                    Add Your First Address
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddressBook;
