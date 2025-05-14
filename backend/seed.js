require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const {
  UserModel,
  SoilModel,
  AirModel,
  WeedModel,
  UserCropModel,
} = require("./db");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("✅ Connected to MongoDB...");

    const rawData = fs.readFileSync("demo.json");
    const { soil, air, weeds } = JSON.parse(rawData);

    // Clear existing entries
    await Promise.all([
      SoilModel.deleteMany({}),
      AirModel.deleteMany({}),
      WeedModel.deleteMany({}),
      UserCropModel.deleteMany({}),
    ]);

    // Insert Soil and Air separately if needed (optional)
    const soilDocs = await SoilModel.insertMany(soil);
    const airDocs = await AirModel.insertMany(air);

    // 🔁 Loop to create UserCropModel entries
    const dummyUser = await UserModel.findOne(); // Assuming you already have a user
    if (!dummyUser) {
      console.error("❌ No user found in DB to assign UserCropModel.");
      return mongoose.connection.close();
    }

    for (let i = 0; i < soilDocs.length; i++) {
      const newCrop = new UserCropModel({
        user: dummyUser._id,
        soil: soilDocs[i],
        air: airDocs[i],
        weeds: weeds[i] || [],
      });
      await newCrop.save();
    }

    console.log(
      "🌱 Seeded UserCropModel with soil, air, and weed data successfully."
    );
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error seeding database:", err);
  });
