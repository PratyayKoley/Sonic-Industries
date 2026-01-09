import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/ui/dialog";
import { Button } from "@/app/ui/button";

interface RazorpayModeDialogProps {
  isPaymentDialogOpen: boolean;
  setIsPaymentDialogOpen: (open: boolean) => void;
  setPaymentMode: (mode: "full" | "partial") => void;
  finalPrice: number;
  shippingFee: number;
  paymentMode: "full" | "partial" | null;
  isPartialPaymentAllowed: boolean;
  confirmRazorpayPayment: () => void;
}

export function RazorpayModeDialog({
  isPaymentDialogOpen,
  setIsPaymentDialogOpen,
  setPaymentMode,
  finalPrice,
  shippingFee,
  paymentMode,
  confirmRazorpayPayment,
  isPartialPaymentAllowed,
}: RazorpayModeDialogProps) {
  return (
    <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Choose Payment Option
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* FULL PAYMENT — ALWAYS */}
          <button
            className="w-full p-4 border rounded-xl hover:bg-gray-100 transition"
            onClick={() => setPaymentMode("full")}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Pay Full Amount</span>
              <span className="font-semibold">₹{finalPrice}</span>
            </div>
          </button>

          {/* PARTIAL PAYMENT — CONDITIONAL */}
          {isPartialPaymentAllowed && (
            <button
              className="w-full p-4 border rounded-xl hover:bg-gray-100 transition"
              onClick={() => setPaymentMode("partial")}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Pay Partial (Shipping Fees)</span>
                <span className="font-semibold">₹{shippingFee}</span>
              </div>
            </button>
          )}

          {!isPartialPaymentAllowed && (
            <p className="text-xs text-gray-500 text-center">
              Partial payment is not available for this order amount.
            </p>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button disabled={!paymentMode} onClick={confirmRazorpayPayment}>
            Continue to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
