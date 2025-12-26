"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gstin?: string;
  shippingAddress: Address;
  billingAddress: Address;
}

interface CustomerFormProps {
  customer: CustomerData;
  setCustomer: Dispatch<SetStateAction<CustomerData>>;
  sameAsShipping: boolean;
  setSameAsShipping: Dispatch<SetStateAction<boolean>>;
  setOtpVerified: Dispatch<SetStateAction<boolean>>;
  otpSent: boolean;
  setOtpSent: Dispatch<SetStateAction<boolean>>;
}

export function CustomerForm({
  customer,
  setCustomer,
  sameAsShipping,
  setSameAsShipping,
  setOtpVerified,
  otpSent,
  setOtpSent,
}: CustomerFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailTouched, setEmailTouched] = useState(false);
  const [otp, setOtp] = useState("");

  const inputClassName =
    "w-full px-3 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white text-sm";
  const labelClassName = "block text-sm text-gray-700 mb-1 font-normal";

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  function validateField(name: string, value: string) {
    let message = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) message = "Required field";
        break;

      case "email":
        if (!value.trim()) message = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Invalid email format";
        break;

      case "phone":
        if (value && value.length !== 10)
          message = "Phone number must be 10 digits";
        break;

      case "postalCode":
        if (!value.trim()) message = "Postal code required";
        break;

      case "gstin":
        if (
          value &&
          !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(value)
        )
          message = "Invalid GSTIN format";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  }

  function useDebounce<T>(value: T, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedEmail = useDebounce(customer.email, 400);
  const debouncedPhone = useDebounce(customer.phone, 400);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail);

  function handleOtpSend() {
    // Replace with your backend OTP API call

    setOtpSent(true);
  }

  function handleOtpValidate() {
    if (!/^[0-9]{4,6}$/.test(otp)) {
      toast.error("Invalid OTP");
      setOtpVerified(false);
      return;
    }

    // ✅ Ideally verify OTP from backend here
    setOtpVerified(true);
    toast.success("OTP Verified Successfully!");
  }

  useEffect(() => {
    if (!emailTouched) return;
    validateField("email", debouncedEmail);
  }, [debouncedEmail]);

  useEffect(() => {
    validateField("phone", debouncedPhone);
  }, [debouncedPhone]);

  const prevEmailRef = useRef(customer.email);

  useEffect(() => {
    if (prevEmailRef.current !== customer.email) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      prevEmailRef.current = customer.email;
    }
  }, [customer.email]);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide border-b pb-2">
        Personal Information
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            Our GSTIN: <span className="font-medium">27BIZPV6068D1ZD</span>
          </p>
        </div>
      </h2>

      {/* First and last name */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClassName}>First Name</label>
          <input
            type="text"
            value={customer.firstName}
            placeholder="First Name"
            onChange={(e) => {
              setCustomer({ ...customer, firstName: e.target.value });
              validateField("firstName", e.target.value);
            }}
            className={inputClassName}
          />
          {errors.firstName && (
            <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className={labelClassName}>Last Name</label>
          <input
            type="text"
            value={customer.lastName}
            placeholder="Last Name"
            onChange={(e) => {
              setCustomer({ ...customer, lastName: e.target.value });
              validateField("lastName", e.target.value);
            }}
            className={inputClassName}
          />
          {errors.lastName && (
            <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email + OTP */}
        <div className="space-y-2">
          <label className={labelClassName}>Email Address</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={customer.email}
            onChange={(e) => {
              const value = e.target.value;
              setCustomer({ ...customer, email: value });
              setEmailTouched(true);
            }}
            className={inputClassName}
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
          )}

          {/* Show Send OTP button when valid email is typed */}
          {emailTouched && isEmailValid && !otpSent && (
            <button
              onClick={handleOtpSend}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
              Send OTP
            </button>
          )}

          {/* OTP input field */}
          {otpSent && (
            <div className="mt-2 space-y-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={inputClassName}
              />
              <button
                onClick={handleOtpValidate}
                className="px-4 py-2 bg-green-600 text-white rounded text-sm"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>

        {/* Phone 10-digit validation */}
        <div className="space-y-2">
          <label className={labelClassName}>Phone Number</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500 text-sm">
              +91
            </span>
            <input
              type="tel"
              placeholder="9876543210"
              value={customer.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setCustomer({ ...customer, phone: value });
              }}
              className={`${inputClassName} pl-10`}
            />
          </div>

          {errors.phone && (
            <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClassName}>GSTIN (optional)</label>
        <input
          type="text"
          placeholder="22AAAAA0000A1Z5"
          value={customer.gstin || ""}
          onChange={(e) => {
            setCustomer({ ...customer, gstin: e.target.value.toUpperCase() });
            validateField("gstin", e.target.value.toUpperCase() || "");
          }}
          className={inputClassName}
        />
        {errors.gstin && (
          <p className="text-red-600 text-xs mt-1">{errors.gstin}</p>
        )}
      </div>

      {/* SHIPPING ADDRESS */}
      <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide border-b pb-2">
        SHIPPING ADDRESS
      </h2>

      {/* Shipping first/last name */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClassName}>First Name</label>
          <input
            type="text"
            value={customer.shippingAddress.firstName}
            onChange={(e) =>
              setCustomer({
                ...customer,
                shippingAddress: {
                  ...customer.shippingAddress,
                  firstName: e.target.value,
                },
              })
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Last Name</label>
          <input
            type="text"
            value={customer.shippingAddress.lastName}
            onChange={(e) =>
              setCustomer({
                ...customer,
                shippingAddress: {
                  ...customer.shippingAddress,
                  lastName: e.target.value,
                },
              })
            }
            className={inputClassName}
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className={labelClassName}>Address</label>
        <input
          type="text"
          value={customer.shippingAddress.address}
          onChange={(e) =>
            setCustomer({
              ...customer,
              shippingAddress: {
                ...customer.shippingAddress,
                address: e.target.value,
              },
            })
          }
          className={inputClassName}
        />
      </div>

      {/* City/State/Postal */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className={labelClassName}>City*</label>
          <input
            type="text"
            value={customer.shippingAddress.city}
            onChange={(e) =>
              setCustomer({
                ...customer,
                shippingAddress: {
                  ...customer.shippingAddress,
                  city: e.target.value,
                },
              })
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>State*</label>
          <select
            value={customer.shippingAddress.state}
            onChange={(e) =>
              setCustomer({
                ...customer,
                shippingAddress: {
                  ...customer.shippingAddress,
                  state: e.target.value,
                },
              })
            }
            className={inputClassName}
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClassName}>ZIP Code*</label>
          <input
            type="text"
            value={customer.shippingAddress.postalCode}
            onChange={(e) => {
              setCustomer({
                ...customer,
                shippingAddress: {
                  ...customer.shippingAddress,
                  postalCode: e.target.value,
                },
              });
              validateField("postalCode", e.target.value);
            }}
            className={inputClassName}
          />
          {errors.postalCode && (
            <p className="text-red-600 text-xs mt-1">{errors.postalCode}</p>
          )}
        </div>
      </div>

      {/* Same as shipping */}
      <div className="mb-5">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => setSameAsShipping(e.target.checked)}
            className="w-4 h-4 text-blue-600 border border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            Billing address is the same as shipping address
          </span>
        </label>
      </div>

      {/* BILLING SECTION */}
      {!sameAsShipping && (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide border-b pb-2">
            BILLING ADDRESS
          </h2>
          {/* Repeat same billing fields... */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClassName}>First Name</label>
              <input
                type="text"
                value={customer.billingAddress.firstName}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    billingAddress: {
                      ...customer.billingAddress,
                      firstName: e.target.value,
                    },
                  })
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Last Name</label>
              <input
                type="text"
                value={customer.billingAddress.lastName}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    billingAddress: {
                      ...customer.billingAddress,
                      lastName: e.target.value,
                    },
                  })
                }
                className={inputClassName}
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className={labelClassName}>Address</label>
            <input
              type="text"
              value={customer.billingAddress.address}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  billingAddress: {
                    ...customer.billingAddress,
                    address: e.target.value,
                  },
                })
              }
              className={inputClassName}
            />
          </div>

          {/* City/State/Postal */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelClassName}>City*</label>
              <input
                type="text"
                value={customer.billingAddress.city}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    billingAddress: {
                      ...customer.billingAddress,
                      city: e.target.value,
                    },
                  })
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>State*</label>
              <select
                value={customer.billingAddress.state}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    billingAddress: {
                      ...customer.billingAddress,
                      state: e.target.value,
                    },
                  })
                }
                className={inputClassName}
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClassName}>ZIP Code*</label>
              <input
                type="text"
                value={customer.billingAddress.postalCode}
                onChange={(e) => {
                  setCustomer({
                    ...customer,
                    billingAddress: {
                      ...customer.billingAddress,
                      postalCode: e.target.value,
                    },
                  });
                  validateField("postalCode", e.target.value);
                }}
                className={inputClassName}
              />
              {errors.postalCode && (
                <p className="text-red-600 text-xs mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
