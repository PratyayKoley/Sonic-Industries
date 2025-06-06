import { Request, Response } from "express";
import { CartModel } from "../models/cart.model";

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const cart = await CartModel.findOne({ userId }).populate("items.productId");

    if (!cart) {
      res.status(200).json({ message: "Cart is empty", items: [] });
      return;
    }

    res.status(200).json({ message: "Cart fetched", cart });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Failed to get cart", error });
  }
};

export const createCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartData = req.body;
    const userId = req.user?.userId;

    if (!userId || !cartData || Object.keys(cartData).length === 0) {
      res.status(400).json({
        message: "User ID and cart data are required.",
      });
      return;
    }

    const existingCart = await CartModel.findOne({ userId });

    if (!existingCart) {
      const newCart = await CartModel.create({
        userId,
        items: cartData.items || [],
      });

      res.status(201).json({
        message: "Cart created successfully.",
        cart: newCart,
      });
    } else {
      const updatedCart = await CartModel.findOneAndUpdate(
        { userId },
        { $set: { items: cartData.items || [] } },
        { new: true }
      );

      res.status(200).json({
        message: "Cart updated successfully.",
        cart: updatedCart,
      });
    }
  } catch (error) {
    console.error("Error creating/updating cart:", error);
    res.status(500).json({
      message: "Failed to create or update cart.",
      error,
    });
  }
};

export const updateCartItemQuantity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { productId, quantity } = req.body;

    if (!userId || !productId || typeof quantity !== "number" || quantity < 1) {
      res.status(400).json({
        message: "User ID, product ID and valid quantity are required.",
      });
      return;
    }

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      res.status(404).json({ message: "Item not found in cart" });
      return;
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Item quantity updated", cart });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ message: "Failed to update quantity", error });
  }
};

export const removeItemFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;

    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Failed to remove item", error });
  }
};

export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    await CartModel.findOneAndDelete({ userId });

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart", error });
  }
};
