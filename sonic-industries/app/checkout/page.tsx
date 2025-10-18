export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutClient />;
    </Suspense>
  );
};

export default CheckoutPage;
