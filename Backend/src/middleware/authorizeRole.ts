import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: "admin" | "member";
      };
    }
  }
}

export const authorizeRole = (requiredRole: "admin" | "member") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: User not authenticated" });
      return;
    }

    if (req.user.role !== requiredRole) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
      return;
    }
    
    next();
  };
};