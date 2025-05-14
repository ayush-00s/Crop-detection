const express = require("express");
const cropRouter = express.Router();
const { UserCropModel } = require("../db");

// --- GET: Fetch all crop data with user info ---
cropRouter.get("/get-info", async (req, res) => {
  try {
    const crops = await UserCropModel.find({})
      .populate("user", "firstName lastName email") // populate user fields (optional)
      .lean();

    res.status(200).json({
      success: true,
      data: crops,
    });
  } catch (error) {
    console.error("❌ Error fetching crop info:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// --- POST: Save new crop data ---
cropRouter.post("/create", async (req, res) => {
  try {
    const { userId, soil, air, weeds } = req.body;

    if (!userId || !soil || !air) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, soil, or air",
      });
    }

    const newCrop = new UserCropModel({
      user: userId,
      soil,
      air,
      weeds: weeds || [],
    });

    await newCrop.save();

    res.status(201).json({
      success: true,
      message: "Crop data saved successfully",
      data: newCrop,
    });
  } catch (error) {
    console.error("❌ Error creating crop data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save crop data",
    });
  }
});

module.exports = cropRouter;