import { z } from "zod";

export const MessageSchema = z.object({
  acceptMessages: z
    .string()
    .min(10, { message: "Content must be atleast of 10 chars" })
    .max(300, { message: "Content must be no longer 300 chars" }),
});
