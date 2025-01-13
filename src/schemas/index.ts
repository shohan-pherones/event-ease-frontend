import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (!@#$%^&*).",
    }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (!@#$%^&*).",
    }),
});

export const createEventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required." }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date must be a valid date string.",
    })
    .transform((val) => new Date(val)),
  location: z.string().min(1, { message: "Location is required." }),
  maxAttendees: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)), {
      message: "Max attendees must be a valid number.",
    })
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val), {
      message: "Max attendees must be an integer.",
    })
    .refine((val) => val > 0, {
      message: "Max attendees must be a positive number.",
    }),
});

export const updateEventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required." }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date must be a valid date string.",
    })
    .transform((val) => new Date(val)),
  location: z.string().min(1, { message: "Location is required." }),
  maxAttendees: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)), {
      message: "Max attendees must be a valid number.",
    })
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val), {
      message: "Max attendees must be an integer.",
    })
    .refine((val) => val > 0, {
      message: "Max attendees must be a positive number.",
    }),
});
