const express = require("express");
const userRouter = express.Router();

const { UserModel } = require("../db");
const { signUpSchema, loginSchema } = require("../schema/zodSchema");
// const { userMiddleware } = require("../middlewares/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  const parsedData = signUpSchema.safeParse(req.body);
  if (!parsedData.success) {
    const formattedErrors = Object.fromEntries(
      Object.entries(parsedData.error.format()).map(([key, value]) => [
        key,
        value._errors,
      ])
    );

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }
  const { firstName, lastName, email, password } = req.body;

  const userSignedup = await UserModel.findOne({ email: email });
  if (userSignedup) {
    return res.status(400).json({
      success: false,
      message: "User already exists. Kindly login",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    const user = await UserModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_USER_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });
    res.status(201).json({
      success: true,
      message: "Signup successful, logged in automatically",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password format",
        errors: validationResult.error.format(),
      });
    }

    const { email, password } = validationResult.data;

    // Explicitly select the password field since it's set to select: false in the schema
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist. Kindly Signup",
      });
    }

    // Check if password exists
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "This account was created with Google. Please use Google Sign In.",
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect credentials",
      });
    }

    // Generate a new token
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_USER_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Set cookie with appropriate options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

userRouter.get("/auth-status", async (req, res) => {
  try {
    // Check if user is logged in via Google OAuth (session-based auth)
    if (req.user) {
      return res.json({ user: req.user, isAuthenticated: true }); // Directly return session user
    }
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
      return res.status(401).json({
        message: "Not logged in or session expired",
        isAuthenticated: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET); // Verify token
    const user = await UserModel.findById(decoded.id).select(
      "firstName lastName email"
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", isAuthenticated: false });
    }

    res.json({ user, isAuthenticated: true }); // ✅ Fixed response format
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Invalid token", isAuthenticated: false });
  }
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
  return res.json({ message: "Logged out successfully" });
});

module.exports = userRouter;
