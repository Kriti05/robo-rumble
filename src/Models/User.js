// models/User.js


import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  leader: {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true 
    },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    course: { type: String, required: true },
    password: { type: String, required: true },
  },
  teamName: { type: String, required: true, trim: true },
  members: [
    {
      name: String,
      phone: String,
      email: String,
      course: String,
    }
  ],
  selectedEvents: [{ type: String }],
  totalAmount: { type: Number, required: true },
  transactionId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  screenshotUrl: { type: String, default: "" }, 
  status: { 
    type: String, 
    enum: ["Pending", "Verified", "Rejected"], 
    default: "Pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

//
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;