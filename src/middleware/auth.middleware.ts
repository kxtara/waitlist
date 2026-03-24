import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15m
  max: 4, // Limit each IP to 4 login requests per window,
  message: "Too many attempts, please try again later",
});