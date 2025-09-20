import { RazorpayPaymentOrder, RazorpayPaymentResponse } from "@/types";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initiatePayment = (orderData: RazorpayPaymentOrder) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: orderData.order.amount,
    currency: orderData.order.currency,
    method: {
      upi: true,
      card: true,
      netbanking: true,
      wallet: true,
      emi: true,
    },
    name: "Sonic Industries",
    description: "Test Transaction",
    order_id: orderData.order.id,
    handler: async function (response: RazorpayPaymentResponse) {
      try {
        const verifyRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/verify-payment`,
          {
            response,
          }
        );

        const data = verifyRes.data;

        if (data.success) {
          window.location.href = `/payment-success?payment_id=${response.razorpay_payment_id}`;
        } else {
          window.location.href = `/payment-failed`;
        }
      } catch (err) {
        console.error(err);
        window.location.href = `/payment-failed`;
      }
    },
    prefill: {
      name: orderData.customer.name,
      email: orderData.customer.email,
      contact: orderData.customer.contact,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
