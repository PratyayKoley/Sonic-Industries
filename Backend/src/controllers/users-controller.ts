import { Request, Response } from "express";
import { UserModel } from "../models/users.model";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "bsdfkhbdfkgjosdfihhwehinsfjibdshifbshidbfiherbjifjiererji";

export const createMemberUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role, password, email, ...rest } = req.body;

    // Check if email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists." });
      return;
    }

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      parallelism: 1,
    });

    // Generate a unique username: MXXXXXXXXXX
    let generatedUsername = "";
    let isUnique = false;

    while (!isUnique) {
      const suffix = uuidv4().replace(/-/g, "").slice(0, 10).toUpperCase();
      generatedUsername = `M${suffix}`;
      const usernameExists = await UserModel.findOne({
        username: generatedUsername,
      });
      if (!usernameExists) {
        isUnique = true;
      }
    }

    // Create new user
    const user = await UserModel.create({
      ...rest,
      email,
      username: generatedUsername,
      password: hashedPassword,
      role: "member",
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const getAllMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await UserModel.find({ role: "member" }).select(
      "-password -security_answer -role -security_question -__v -createdAt -updatedAt -_id"
    );
    res.status(200).json({
      message: "Members fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Failed to fetch members", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res
        .status(400)
        .json({ message: "Email/Phone and password are required." });
      return;
    }

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
        prof_image_url: user.prof_image_url,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (req.user?.userId === id) {
      res.status(400).json({ message: "Admins cannot delete themselves." });
      return;
    }

    const deletedMember = await UserModel.findByIdAndDelete(id);

    if (!deletedMember) {
      res.status(404).json({ message: "Member not found." });
      return;
    }

    res.status(200).json({
      message: "Member deleted successfully.",
      user: deletedMember,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user", error });
  }
};