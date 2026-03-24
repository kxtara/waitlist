/**
 Subscribe / Unsubscribe to waitlist
 * 
 * 
 */
import { prisma } from "../../config/prisma";
import type z from "zod";
import type { subscribeSchema } from "./schema";
import { Status } from "../../../generated/prisma/enums";
import { AppError } from "../../utils/AppError";

interface WaitlistResponse {
  status: Status;
  userAgent?: string | null;
}

export const subscribeToWaitlist = async (
  data: z.infer<typeof subscribeSchema>,
): Promise<WaitlistResponse> => {
  // Check if user already exists
  const existing = await prisma.waitlistEntry.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    if (existing.status === "SUBSCRIBED") {
      throw new AppError("Email exists", 409, "EMAIL_EXISTS");
    }
    // Reactivate an unsubscribed user
    return await prisma.waitlistEntry.update({
      where: { email: data.email },
      data: {
        email: data.email,
        status: Status.SUBSCRIBED,
        userAgent: data.userAgent
      },
      select: {
        status: true,
        userAgent: true,
      },
    });
  }

  return await prisma.waitlistEntry.create({
    data: {
      email: data.email,
      userAgent : data.userAgent
    },

    select: {
      status: true,
      userAgent: true,
    },
  });
};

export const unsubscribeFromWaitlist = async (
  email: string,
): Promise<WaitlistResponse> => {
  // Check if user doesn't exists
  const existing = await prisma.waitlistEntry.findFirst({
    where: { email, status: Status.SUBSCRIBED },
  });

  if (!existing) {
    throw new AppError("User not Found", 404, "USER_NOT_FOUND");
  }

  return await prisma.waitlistEntry.update({
    where: { email: email },
    data: {
      status: Status.UNSUBSCRIBED,
    },
    select: {
      status: true,
      userAgent: true,
    },
  });
};
