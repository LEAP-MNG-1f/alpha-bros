import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  latitude: Number,
  longitude: Number,
});

export const Location = mongoose.model("Location", locationSchema);
