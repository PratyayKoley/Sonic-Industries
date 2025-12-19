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
  gstPrice: number;
  shippingFee: number;
  finalPrice: number;
  isLoading: boolean;
  message: string;
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
  gstPrice,
  isLoading,
  message,
  onQuantityChange,
  onCouponChange,
  onApplyCoupon,
  onCodCheckout,
  onRazorpayCheckout,
}: OrderSummaryProps) {
  const [selected, setSelected] = useState<"razorpay" | "cod" | null>(null);
  const prepaidDiscount = selected === "razorpay" ? finalPrice * 0.02 : 0;
  const postpaidCharge = selected === "cod" ? finalPrice * 0.02 : 0;
  const totalSavings = (discount || 0) + prepaidDiscount;

  const finalTotal = finalPrice - prepaidDiscount + postpaidCharge;

  return (
    <div className="bg-blue-100/25 rounded-lg p-6">
      {/* Important Notes Section */}
      <div className="mb-5 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-sm text-gray-800 space-y-2">
        <p className="font-semibold text-gray-900">Important Information</p>

        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Shipping Fee Rules: </span>
            If the product price is below ₹10,000 → Shipping Fee = ₹1000. If
            product price is above ₹10,000 → Shipping Fee = ₹5000.
          </li>

          <li>
            <span className="font-medium">Payment Method Discounts: </span>
            Razorpay (Prepaid) gives{" "}
            <span className="font-semibold text-green-600">2% discount</span>.
            COD adds{" "}
            <span className="font-semibold text-red-600">2% extra charge</span>.
          </li>

          <li>
            <span className="font-medium">Partial Payment: </span>
            Pay only the transportation fee via Razorpay → Remaining product
            amount paid via COD.
          </li>

          <li>
            <span className="font-medium">Bonus Rewards:</span>
            Prepaid (Razorpay) orders get a{" "}
            <span className="font-semibold text-blue-600">
              guaranteed bonus spin reward
            </span>
            . COD or partial payments{" "}
            <span className="text-red-600 font-semibold">
              do NOT get rewards
            </span>
            .
          </li>
        </ul>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-2 border-b">
        ORDER SUMMARY
      </h2>

      {/* Product Display */}
      <div className="mb-5">
        <div className="flex space-x-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
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

        <div className="mt-2 text-sm text-green-600">{message}</div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4 border-t pt-5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Order Subtotal</span>
          <span className="text-sm font-medium">₹{totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Est. Transportation Fee</span>
          <span className="text-sm font-medium">₹{shippingFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">GST (18%)</span>
          <span className="text-sm font-medium">₹{gstPrice.toFixed(2)}</span>
        </div>

        {selected === "razorpay" && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Prepaid Discount</span>
            <span className="text-sm font-medium">
              ₹{prepaidDiscount.toFixed(2)}
            </span>
          </div>
        )}

        {selected === "cod" && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">COD Charges</span>
            <span className="text-sm font-medium">
              ₹{postpaidCharge.toFixed(2)}
            </span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Discount</span>
            <span className="text-sm font-medium text-green-600">
              -₹{discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Total Savings</span>
          <span className="text-sm font-medium">
            ₹{totalSavings > 0 ? `${totalSavings.toFixed(2)}` : "0.00"}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-red-600">
              Final Total Price
            </span>
            <span className="text-sm font-semibold text-red-600">
              ₹{finalTotal.toFixed(2)}
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
