const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    select: false,
  },
  googleId: { type: String, unique: true, sparse: true }, // For Google Auth users
  profilePicture: { type: String }, // Optional: Store Google profile picture
});

const SoilSchema = new Schema({
  moisture: { type: Number, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
});

const AirSchema = new Schema({
  humidity: { type: Number, required: true },
  temperature: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
});

const WeedSchema = new Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  detectedAt: { type: Date, default: Date.now }
});
const UserCropSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  soil: {
    type: SoilSchema,
    required: true,
  },
  air: {
    type: AirSchema,
    required: true,
  },
  weeds: [WeedSchema], // An array of weed records
});

const UserModel = mongoose.model("User", userSchema);
const AirModel = mongoose.model("Air", AirSchema);
const SoilModel = mongoose.model("Soil", SoilSchema);
const UserCropModel = mongoose.model("UserCrop", UserCropSchema);
const WeedModel = mongoose.model("Weed", WeedSchema); 


module.exports = {
  UserModel,
  SoilModel,
  AirModel,
  UserCropModel,
  WeedModel,
};