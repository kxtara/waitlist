import { type Request, type Response, type NextFunction } from "express";
import { subscribeToWaitlist, unsubscribeFromWaitlist } from "./service";
import { subscribeSchema } from "./schema";
import { welcomeMessage } from "../../utils/messages";

export const handleSubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = subscribeSchema.parse(req.body);
    const userAgent = req.headers["user-agent"] || "Unknown Device";
    console.log(userAgent);
    const data = { email, userAgent };

    const subscribed = await subscribeToWaitlist(data);

    await welcomeMessage(email).catch((err) =>
      console.error("Email failed", err),
    );

    res.status(200).json({
      success: true,
      message: "Subscribed!!",
      data: {
        ...subscribed,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const handleUnsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = subscribeSchema.parse(req.query);

    if (!email || typeof email !== 'string') {
      return res.status(400).send("Invalid unsubscribe link.");
    }


    await unsubscribeFromWaitlist(email);
    res.status(200).send(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f9f9f9; }
            .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
            h1 { color: #444; }
            p { color: #666; }
            .btn { display: inline-block; margin-top: 1rem; color: #5C6BC0; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>You're Unsubscribed</h1>
            <p>We've removed <strong>${email}</strong> from the Chattri waitlist.</p>
            <a href="https://chattri-waitlist.onrender.com" class="btn">Back to Home</a>
          </div>
        </body>
      </html>
    `
    )
  } catch (err) {
    next(err);
  }
};
