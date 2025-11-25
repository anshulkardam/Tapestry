import z from "zod";

export interface CustomJwtSessionClaims {
  metadata?: {
    role?: "user" | "admin";
  };
}

export const UserFormSchema = z.object({
  firstName: z
    .string({ message: "First Name is Required" })
    .min(2, { message: "First name must be at least 2 characters!" })
    .max(50),
  lastName: z
    .string({ message: "Last Name is Required" })
    .min(2, { message: "Last name must be at least 2 characters!" })
    .max(50),
  username: z
    .string({ message: "Username is Required" })
    .min(2, { message: "Username must be at least 2 characters!" })
    .max(50),
  emailAddress: z.array(z.email({ message: "Invalid email address!" }), {
    message: "Email Address is Required",
  }),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(50),
});
