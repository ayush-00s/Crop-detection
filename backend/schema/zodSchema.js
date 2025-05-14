const { z } = require("zod");

const signUpSchema = z.object({
  email: z
    .string()
    .email()
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Email must be a Gmail address",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters " })
    .max(100),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 character" })
    .max(100),
});

const loginSchema = signUpSchema.pick({ email: true, password: true });

module.exports = { signUpSchema, loginSchema };
