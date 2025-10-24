import { DealModel } from "../models/deals.model";
import { OrderModel } from "../models/orders.model";
import { Product, ProductModel } from "../models/products.model";

export const isDealApplicable = async (
  couponCode: string,
  productId: string,
  email: string
) => {
  try {
    // 1️⃣ Find the deal by coupon code
    const deal = await DealModel.findOne({ couponCode });
    if (!deal) {
      return { valid: false, message: "Invalid coupon code", discount: 0 };
    }

    // For product-specific deals, ensure product matches
    if (deal.dealType === "product" && deal.productName) {
      const product: Product | null = await ProductModel.findById(productId);
      if (product && product.name !== deal.productName) {
        return {
          valid: false,
          message: `This coupon is only valid for ${deal.productName}.`,
          discount: 0,
        };
      }
    }

    // 2️⃣ Check expiration
    if (new Date(deal.expiresAt) < new Date()) {
      return { valid: false, message: "This deal has expired", discount: 0 };
    }

    // 3️⃣ Handle general vs product deals
    let prevOrder;

    if (deal.dealType === "general") {
      // User can only use this coupon once — on any product
      prevOrder = await OrderModel.findOne({
        "customer.email": email,
        couponCode: deal._id,
      });
    } else if (deal.dealType === "product") {
      // Only for the specific product
      prevOrder = await OrderModel.findOne({
        "customer.email": email,
        couponCode: deal._id,
        "order_items.productId": productId,
      });
    }

    // 4️⃣ If the user already used it
    if (prevOrder) {
      return {
        valid: false,
        message:
          deal.dealType === "general"
            ? "You have already availed this general offer."
            : "You have already availed this offer for this product.",
        discount: 0,
      };
    }

    // 5️⃣ All good → apply discount
    return {
      valid: true,
      message: "Coupon code applied successfully.",
      discount: deal.discountedPrice,
    };
  } catch (err) {
    console.error("Error validating deal:", err);
    return {
      valid: false,
      message: "An error occurred while validating the coupon.",
      discount: 0,
    };
  }
};
