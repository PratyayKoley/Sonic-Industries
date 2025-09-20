import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initiatePayment = (orderData: any) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: orderData.order.amount,
    currency: orderData.order.currency,
    name: "My Shop",
    description: "Test Transaction",
    order_id: orderData.id,
    handler: function (response: any) {
      alert("Payment successful: " + response.razorpay_payment_id);
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

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};
