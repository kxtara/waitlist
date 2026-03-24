import express from "express";
import cookieParser from "cookie-parser";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import v1Router from "./routes/v1";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use('/images', express.static('public/images'));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// Use express middleware for easier cookie handling
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,                // Allows cookies to be sent
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// Needed to be able to read body data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Supports urlencoded bodies

app.use((req: Request, _res:Response, next: NextFunction) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1", v1Router);

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
