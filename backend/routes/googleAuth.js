const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db");
require("dotenv").config();

const googleAuthRouter = express.Router();

googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    console.log("🔹 Google Authenticated User:", req.user);
    try {
      const user = await UserModel.findOne({ email: req.user.email });

      if (!user) {
        user = await UserModel.create({
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          googleId: req.user.id, // Store Google ID
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_USER_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Set JWT as an HttpOnly cookie
      res.cookie("token", token, {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // Enable in production
        sameSite: "Strict", // Prevents CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      // Redirect to frontend dashboard
      res.redirect(`${process.env.FRONTEND_URL}/`);
    } catch (error) {
      console.error("Google Auth Error:", error);
      // Handle Duplicate Email Error (E11000)
      if (error.code === 11000) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=Email%20already%20in%20use`
        );
      }
      res.redirect(`${process.env.FRONTEND_URL}/login?error=OAuthFailed`);
    }
  }
);

googleAuthRouter.get("/logout", async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.clearCookie("token");
    res.redirect(`${process.env.FRONTEND_URL}/`);
  });
});

module.exports = googleAuthRouter;
