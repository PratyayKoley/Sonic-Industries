import { Dispatch, SetStateAction } from "react";

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
  shippingAddress: Address;
  billingAddress: Address;
}

interface CustomerFormProps {
  customer: CustomerData;
  setCustomer: Dispatch<SetStateAction<CustomerData>>;
  sameAsShipping: boolean;
  setSameAsShipping: Dispatch<SetStateAction<boolean>>;
}

export function CustomerForm({
  customer,
  setCustomer,
  sameAsShipping,
  setSameAsShipping,
}: CustomerFormProps) {
  const inputClassName =
    "w-full px-3 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white text-sm";
  const labelClassName = "block text-sm text-gray-700 mb-1 font-normal";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Personal Information Section */}
      <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide border-b pb-2">
        Personal Information
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClassName}>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={customer.firstName}
            onChange={(e) =>
              setCustomer({ ...customer, firstName: e.target.value })
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={customer.lastName}
            onChange={(e) =>
              setCustomer({ ...customer, lastName: e.target.value })
            }
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label className={labelClassName}>Email Address</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label className={labelClassName}>Phone Number</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500 text-sm">
              +91
            </span>
            <input
              type="tel"
              placeholder=""
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              className={`${inputClassName} pl-10`}
            />
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide border-b pb-2">
          SHIPPING ADDRESS
        </h2>

        {/* Name Fields Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClassName}>First Name</label>
            <input
              type="text"
              placeholder="First Name"
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
              placeholder="Last Name"
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

        {/* Address Field */}
        <div className="mb-4">
          <label className={labelClassName}>Address</label>
          <input
            type="text"
            placeholder="Address"
            value={customer.shippingAddress.address}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev,
                shippingAddress: {
                  ...prev.shippingAddress,
                  address: e.target.value,
                },
              }))
            }
            className={inputClassName}
          />
        </div>

        {/* City, State, ZIP Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelClassName}>City*</label>
            <input
              type="text"
              placeholder="City"
              value={customer.shippingAddress.city}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  shippingAddress: {
                    ...prev.shippingAddress,
                    city: e.target.value,
                  },
                }))
              }
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>State*</label>
            <select
              value={customer.shippingAddress.state}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  shippingAddress: {
                    ...prev.shippingAddress,
                    state: e.target.value,
                  },
                }))
              }
              className={inputClassName}
            >
              <option value="">State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              {/* Add more states as needed */}
            </select>
          </div>

          <div>
            <label className={labelClassName}>ZIP Code*</label>
            <input
              type="text"
              placeholder="ZIP Code"
              value={customer.shippingAddress.postalCode}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  shippingAddress: {
                    ...prev.shippingAddress,
                    postalCode: e.target.value,
                  },
                }))
              }
              className={inputClassName}
            />
          </div>
        </div>

        {/* Country Field */}
        <div className="mb-6">
          <label className={labelClassName}>Country</label>
          <select
            value={customer.shippingAddress.country}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev,
                shippingAddress: {
                  ...prev.shippingAddress,
                  country: e.target.value,
                },
              }))
            }
            className={inputClassName}
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
            {/* Add more countries as needed */}
          </select>
        </div>
      </div>

      {/* Same as Shipping Checkbox */}
      <div className="mb-5">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => setSameAsShipping(e.target.checked)}
            className="w-4 h-4 text-blue-600 border border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            Billing address is the same as shipping address
          </span>
        </label>
      </div>

      {/* Billing Address Section */}
      {!sameAsShipping && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide border-b pb-2">
            BILLING ADDRESS
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClassName}>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={customer.billingAddress.firstName}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      firstName: e.target.value,
                    },
                  }))
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={customer.billingAddress.lastName}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      lastName: e.target.value,
                    },
                  }))
                }
                className={inputClassName}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClassName}>Address</label>
            <input
              type="text"
              placeholder="Address"
              value={customer.billingAddress.address}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  billingAddress: {
                    ...prev.billingAddress,
                    address: e.target.value,
                  },
                }))
              }
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelClassName}>City*</label>
              <input
                type="text"
                placeholder="City"
                value={customer.billingAddress.city}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      city: e.target.value,
                    },
                  }))
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>State*</label>
              <select
                value={customer.billingAddress.state}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      state: e.target.value,
                    },
                  }))
                }
                className={inputClassName}
              >
                <option value="">State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                {/* Add more states as needed */}
              </select>
            </div>

            <div>
              <label className={labelClassName}>ZIP Code*</label>
              <input
                type="text"
                placeholder="ZIP Code"
                value={customer.billingAddress.postalCode}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      postalCode: e.target.value,
                    },
                  }))
                }
                className={inputClassName}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClassName}>Country</label>
            <select
              value={customer.billingAddress.country}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  billingAddress: {
                    ...prev.billingAddress,
                    country: e.target.value,
                  },
                }))
              }
              className={inputClassName}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
