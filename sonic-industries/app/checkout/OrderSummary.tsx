import { ProductBackend } from "@/types";
import { Wallet } from "lucide-react";
import { SiRazorpay } from "react-icons/si";
import { useState } from "react";

interface OrderSummaryProps {
  product: ProductBackend;
  quantity: number;
  coupon: string;
  discount: number;
  totalPrice: number;
  shippingFee: number;
  finalPrice: number;
  isLoading: boolean;
  onQuantityChange: (delta: number) => void;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
  onCodCheckout: () => void;
  onRazorpayCheckout: () => void;
}

export function OrderSummary({
  product,
  quantity,
  coupon,
  discount,
  totalPrice,
  shippingFee,
  finalPrice,
  isLoading,
  onQuantityChange,
  onCouponChange,
  onApplyCoupon,
  onCodCheckout,
  onRazorpayCheckout,
}: OrderSummaryProps) {
  const [selected, setSelected] = useState<"razorpay" | "cod" | null>(null);
  return (
    <div className="bg-blue-100/25 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-2 border-b">
        ORDER SUMMARY
      </h2>

      {/* Product Display */}
      <div className="mb-5">
        <div className="flex space-x-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/api/placeholder/80/80"}
            alt={product.name}
            className="w-20 h-20 object-cover border rounded"
          /> 
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 text-sm mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">₹{product.price}</p>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Qty:</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => onQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => onQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Code */}
      <div className="border-t pt-5 mb-5">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => onCouponChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
          <button
            onClick={onApplyCoupon}
            disabled={!coupon.trim()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium cursor-pointer"
          >
            Apply
          </button>
        </div>

        {discount > 0 && (
          <div className="mt-2 text-sm text-green-600">
            Coupon applied successfully!
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4 border-t pt-5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Order Subtotal</span>
          <span className="text-sm font-medium">₹{totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Est. Delivery</span>
          <span className="text-sm font-medium">₹{shippingFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Est. Tax</span>
          <span className="text-sm font-medium">₹4.49</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Promotion</span>
            <span className="text-sm font-medium text-green-600">
              -₹{discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Pre-Tax Total</span>
          <span className="text-sm font-medium">
            ₹{(finalPrice + 4.49).toFixed(2)}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-red-600">
              Total Savings
            </span>
            <span className="text-sm font-semibold text-red-600">
              ₹{discount > 0 ? `${discount.toFixed(2)}` : "0.00"}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Buttons */}
      <div className="space-y-4">
        {/* Payment method selection */}
        <div className="grid grid-cols-2 gap-4">
          {/* Razorpay */}
          <div
            onClick={() => setSelected("razorpay")}
            className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition ${
              selected === "razorpay"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <SiRazorpay className="w-8 h-8 text-blue-600" />
            <span className="mt-2 font-medium text-sm text-center">
              Razorpay
            </span>
          </div>

          {/* Cash on Delivery */}
          <div
            onClick={() => setSelected("cod")}
            className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition ${
              selected === "cod"
                ? "border-green-600 bg-green-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Wallet className="w-8 h-8 text-green-600" />
            <span className="mt-2 font-medium text-sm text-center">
              Cash on Delivery
            </span>
          </div>
        </div>

        {/* Action button (appears after selection) */}
        {selected && (
          <button
            onClick={
              selected === "razorpay" ? onRazorpayCheckout : onCodCheckout
            }
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg font-semibold shadow-md transition-colors cursor-pointer
      ${
        selected === "razorpay"
          ? "bg-[#1a3c92] hover:bg-[#0f2c6a] text-white"
          : "bg-green-600 hover:bg-green-700 text-white"
      }
      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
    `}
          >
            {isLoading ? (
              "Processing..."
            ) : selected === "razorpay" ? (
              <>
                <SiRazorpay className="w-5 h-5" />
                <span>Pay Now</span>
              </>
            ) : (
              <span>Cash on Delivery</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
