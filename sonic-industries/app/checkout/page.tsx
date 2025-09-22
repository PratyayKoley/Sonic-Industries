"use client";

import axios from "axios";
import { initiatePayment } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductBackend } from "@/types";
import { CustomerForm } from "./CustomerForm";
import { OrderSummary } from "./OrderSummary";
import { LoadingSpinner } from "./LoadingSpinner";
import CheckoutTimer from "./CheckoutTimer";

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

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("token");
  const [product, setProduct] = useState<ProductBackend | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddress: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    billingAddress: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const [sameAsShipping, setSameAsShipping] = useState(false);

  useEffect(() => {
    if (!sessionToken) return;

    const verifyToken = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/checkout/verify-token`,
          { sessionToken }
        );

        const productData = await res.data;
        setProduct(productData.product);
      } catch (error) {
        console.error("Verification failed during session: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [sessionToken]);

  // Update billing if same as shipping
  useEffect(() => {
    if (sameAsShipping) {
      setCustomer((prev) => ({
        ...prev,
        billingAddress: { ...prev.shippingAddress },
      }));
    }
  }, [sameAsShipping, customer.shippingAddress]);

  if (!sessionToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded border">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Product Selected
          </h2>
          <p className="text-gray-600">
            Please select a product to proceed with checkout.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !product) {
    return <LoadingSpinner />;
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.min(10, Math.max(1, prev + delta)));
  };

  const applyCoupon = () => {
    if (coupon.trim()) {
      setDiscount(10);
    }
  };

  const handleCodCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
        {
          sessionToken,
          customer: {
            ...customer,
          },
          payment_method: "cod",
          quantity,
        }
      );
      alert("Order placed successfully!");
    } catch (error) {
      console.error("COD checkout failed:", error);
      alert("Order failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRazorpayCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/create-order`,
        {
          sessionToken,
          customer: {
            ...customer,
          },
          payment_method: "razorpay",
          quantity,
        }
      );
      const { newOrder, RazorpayOrder, customerData } = res.data;
      const paymentPayLoad = {
        order: RazorpayOrder,
        customerData: customerData,
      };
      initiatePayment(paymentPayLoad);
    } catch (error) {
      console.error("Razorpay checkout failed:", error);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = product.price * quantity;
  const shippingFee = 50;
  const finalPrice = totalPrice + shippingFee - discount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                Shipping & Gift Options
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                Billing & Payment
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                Order Review
              </span>
            </div>
          </div>
          <div>
            <CheckoutTimer token={sessionToken} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2">
            <CustomerForm
              customer={customer}
              setCustomer={setCustomer}
              sameAsShipping={sameAsShipping}
              setSameAsShipping={setSameAsShipping}
            />
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              product={product}
              quantity={quantity}
              coupon={coupon}
              discount={discount}
              totalPrice={totalPrice}
              shippingFee={shippingFee}
              finalPrice={finalPrice}
              isLoading={isLoading}
              onQuantityChange={handleQuantityChange}
              onCouponChange={setCoupon}
              onApplyCoupon={applyCoupon}
              onCodCheckout={handleCodCheckout}
              onRazorpayCheckout={handleRazorpayCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
