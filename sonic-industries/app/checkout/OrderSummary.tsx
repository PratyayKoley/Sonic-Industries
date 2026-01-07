import { ProductBackend } from "@/types";
import { Wallet } from "lucide-react";
import { SiRazorpay } from "react-icons/si";
import { useState } from "react";
import { toast } from "sonner";

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
  otpVerified: boolean;
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
  otpVerified,
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
    <div className="bg-blue-100/25 rounded-xl p-4 sm:p-6 w-full max-w-xl mx-auto">
      {/* IMPORTANT NOTES */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-xs sm:text-sm text-gray-800 space-y-2">
        <p className="font-semibold text-gray-900">Important Information</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            <span className="font-medium">Shipping Fee:</span> Below ₹10,000 →
            ₹1000, Above ₹10,000 → ₹5000
          </li>
          <li>
            <span className="font-medium">Payment Discount:</span>{" "}
            <span className="text-green-600 font-semibold">2% off</span> on
            Razorpay,{" "}
            <span className="text-red-600 font-semibold">2% extra</span> on COD
          </li>
          <li>
            <span className="font-medium">Partial Payment:</span> Shipping via
            Razorpay, rest COD
          </li>
          <li>
            <span className="font-medium">Bonus Rewards:</span>{" "}
            <span>Prepaid (Razorpay) orders get a guaranteed bonus spin reward</span>
          </li>
        </ul>
      </div>

      {/* TITLE */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
        ORDER SUMMARY
      </h2>

      {/* PRODUCT */}
      <div className="flex gap-4 mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border"
        />

        <div className="flex-1">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            ₹{product.price}
          </p>

          {/* QTY */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs sm:text-sm text-gray-600">Qty</span>
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() => onQuantityChange(-1)}
                disabled={quantity <= 1}
                className="px-2 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
              >
                −
              </button>
              <span className="px-3 text-sm">{quantity}</span>
              <button
                onClick={() => onQuantityChange(1)}
                disabled={quantity >= 10}
                className="px-2 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COUPON */}
      <div className="border-t pt-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={coupon}
            placeholder="Enter coupon code"
            onChange={(e) => onCouponChange(e.target.value)}
            className="flex-1 px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={onApplyCoupon}
            disabled={!coupon.trim()}
            className="px-4 py-2 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300 disabled:opacity-50"
          >
            Apply
          </button>
        </div>
        {message && (
          <p className="mt-2 text-xs sm:text-sm text-green-600">{message}</p>
        )}
      </div>

      {/* PRICE BREAKDOWN */}
      <div className="space-y-2 text-xs sm:text-sm border-t pt-4 mb-6">
        <Row label="Subtotal" value={totalPrice} />
        <Row label="Shipping Fee" value={shippingFee} />
        <Row label="GST (18%)" value={gstPrice} />

        {selected === "razorpay" && (
          <Row label="Prepaid Discount" value={-prepaidDiscount} />
        )}

        {selected === "cod" && (
          <Row label="COD Charges" value={postpaidCharge} />
        )}

        {discount > 0 && (
          <Row label="Discount" value={-discount} highlight />
        )}

        <Row label="Total Savings" value={totalSavings} />

        <div className="border-t pt-3 flex justify-between font-semibold text-red-600">
          <span>Final Total</span>
          <span>₹{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* PAYMENT METHODS */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <PaymentCard
            active={selected === "razorpay"}
            onClick={() => setSelected("razorpay")}
            label="Razorpay"
            icon={<SiRazorpay className="w-6 h-6 text-blue-600" />}
            activeClass="border-blue-600 bg-blue-50"
          />
          <PaymentCard
            active={selected === "cod"}
            onClick={() => setSelected("cod")}
            label="Cash on Delivery"
            icon={<Wallet className="w-6 h-6 text-green-600" />}
            activeClass="border-green-600 bg-green-50"
          />
        </div>

        {selected && (
          <button
            onClick={() => {
              if (selected === "razorpay" && !otpVerified) {
                toast.error("Please verify OTP first");
                return;
              }
              selected === "razorpay"
                ? onRazorpayCheckout()
                : onCodCheckout();
            }}
            disabled={isLoading || (selected === "razorpay" && !otpVerified)}
            className={`w-full py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition
              ${
                selected === "razorpay"
                  ? "bg-[#1a3c92] hover:bg-[#0f2c6a]"
                  : "bg-green-600 hover:bg-green-700"
              }
              text-white disabled:opacity-50`}
          >
            {isLoading ? "Processing..." : selected === "razorpay" ? "Pay Now" : "Place Order"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- SMALL HELPERS ---------- */

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-700">{label}</span>
      <span
        className={`font-medium ${
          highlight ? "text-green-600" : "text-gray-900"
        }`}
      >
        ₹{Math.abs(value).toFixed(2)}
      </span>
    </div>
  );
}

function PaymentCard({
  active,
  onClick,
  icon,
  label,
  activeClass,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  activeClass: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center text-center gap-2 transition ${
        active ? activeClass : "border-gray-300 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </div>
  );
}