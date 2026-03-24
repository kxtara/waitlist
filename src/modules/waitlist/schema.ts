import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.email(),
  userAgent: z.string().nullish().transform((val) => val ?? null)
});