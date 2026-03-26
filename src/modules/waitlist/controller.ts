import { type Request, type Response, type NextFunction } from "express";
import { subscribeToWaitlist, unsubscribeFromWaitlist } from "./service.js";
import { subscribeSchema } from "./schema.js";
import { welcomeMessage } from "../../utils/messages.js";

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

    const currentYear = new Date().getFullYear();
    const protocol = req.protocol;
    const host = req.get('host');
    const LOGO_URL = `${protocol}://${host}/images/logo.jpeg`;

    res.status(200).send(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unsubscribed | Chattri</title>
          <style>
              body { 
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  min-height: 100vh; 
                  margin: 0; 
                  background-color: #f9f9f9; 
              }
              .container { 
                  max-width: 400px; 
                  width: 90%;
                  background: white; 
                  border: 1px solid #e0e0e0; 
                  border-radius: 10px; 
                  overflow: hidden; 
                  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
              }
              .gradient-bar { 
                  height: 5px; 
                  background: linear-gradient(to right, #FFD180, #FFF59D, #C5E1A5, #81D4FA, #CE93D8); 
              }
              .content { padding: 30px; text-align: center; }
              .logo { 
                  width: 60px; 
                  height: 60px; 
                  border-radius: 8px; 
                  margin-bottom: 15px;
                  object-fit: cover;
              }
              h2 { color: #444; margin: 10px 0; font-size: 22px; }
              p { color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px; }
              .status-box { 
                  background-color: #fdfdfd; 
                  border-radius: 8px; 
                  padding: 15px; 
                  margin: 20px 0; 
                  border: 1px solid #eee; 
              }
              .status-text { color: #5C6BC0; font-weight: bold; margin: 0; font-size: 14px; }
              .btn { 
                  display: inline-block; 
                  padding: 10px 20px; 
                  color: #999; 
                  text-decoration: none; 
                  font-size: 14px; 
                  font-weight: 500;
                  transition: color 0.2s;
              }
              .btn:hover { color: #5C6BC0; }
              hr { border: 0; border-top: 1px solid #eee; margin: 25px 0 15px; }
              .footer { color: #bbb; font-size: 11px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="gradient-bar"></div>
              <div class="content">
                  <img src="${LOGO_URL}" alt="Chattri Logo" class="logo">
                  <h2>Success</h2>
                  <p>You've been unsubscribed from the Chattri waitlist.</p>
                  
                  <div class="status-box">
                      <p class="status-text">
                          We've removed <strong>${email}</strong> from our list.
                      </p>
                  </div>

                  <p style="color: #666; font-size: 14px;">We're sorry to see you go, but you're welcome back anytime.</p>
                  
                  <a href="https://chattri-waitlist.onrender.com" class="btn">Return to Website</a>
                  
                  <hr>
                  <div class="footer">
                      &copy; ${currentYear} Chattri Inc.
                  </div>
              </div>
          </div>
      </body>
      </html>
    `
    )
  } catch (err) {
    next(err);
  }
};
