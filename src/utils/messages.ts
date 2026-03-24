import nodemailer from "nodemailer"
import { env } from "../config/env.js";
import { welcomeTemplate, customeTemplate } from "./templates.js";

const BASE_URL = process.env.APP_URL;
// add unsubscribe link
export const welcomeMessage = async (userEmail: string) => {
    const url = `${BASE_URL}/unsubscribe?email=${userEmail}`

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:  env.EMAIL,
          pass: env.EMAIL_PASSWORD 
        }
    });

    const senderEmail = env.EMAIL;

    await transporter.sendMail({
        from: `"Chattri Team" <${senderEmail}>`,
        to: userEmail,
        subject: "Welcome to Chattri!",
        text: "You're now part of our beta users",
        html: welcomeTemplate(url),
        attachments: [{
        filename: 'logo.jpeg',
        path: './public/images/logo.jpeg', // Path to the file on your server
        cid: 'logo' // This must match the img src "cid:logo"
    }]
    })
}
export const customeMessage = async (userEmail: string, subject: string, content: string, title: string) => {
    const url = `${BASE_URL}/unsubscribe?email=${userEmail}`
     
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:  env.EMAIL,
          pass: env.EMAIL_PASSWORD 
        }
    });

    const senderEmail = env.EMAIL;

    await transporter.sendMail({
        from: `"Chattri Team" <${senderEmail}>`,
        to: userEmail,
        subject: subject,
        text: title,
        html: customeTemplate(title,content,url),
        attachments: [{
        filename: 'logo.jpeg',
        path: './public/images/logo.jpeg', // Path to the file on your server
        cid: 'logo' // This must match the img src "cid:logo"
    }]
    })
}