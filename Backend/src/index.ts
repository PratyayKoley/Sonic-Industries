import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
// Database Connection
import "./database";

import UserRoutes from "./routes/users-routes";
import CategoryRoutes from "./routes/categories-routes";
import ProductRoutes from "./routes/products-routes";
import CartRoutes from "./routes/cart-routes";
import OrderRoutes from "./routes/orders-routes";
import DealRoutes from "./routes/deal-routes";
import LeadRoutes from "./routes/lead-routes";

dotenv.config();
const app = express();
const port: number = parseInt(process.env.PORT || "5000");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

app.use("/api/users", UserRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/deals", DealRoutes);
app.use("/api/leads", LeadRoutes);

// Server Connection
app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome to Sonic Industries");
});

app.listen(port, (): void => {
  console.log(`Server is running on PORT : ${port}`);
});
