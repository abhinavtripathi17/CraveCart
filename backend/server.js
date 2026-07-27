import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port =process.env.PORT || 4000;

//middlewares
app.use(express.json());
const normalizeOrigin = (origin) => origin?.trim().replace(/\/$/, "");
const allowedOrigins = [
  "https://cravecraftabhinavtripathi.vercel.app",
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean),
];

app.use(cors({
  origin: (origin, callback) => {
    const requestOrigin = normalizeOrigin(origin);
    if (
      !requestOrigin ||
      allowedOrigins.includes(requestOrigin) ||
      /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(requestOrigin)
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.json({ message: "API Working", checkout: "cash-on-delivery" });
});

const server = app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Stop the other backend process or set a different PORT in backend/.env.`
    );
    process.exit(1);
  }

  console.error("Server failed to start:", error);
  process.exit(1);
});
