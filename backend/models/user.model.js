import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  currentCompany: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  profileImage: {
    url: {
      type: String,
    },
    public_id: {
      type: String
    }
  },
  role: {
    type: String,
    enum: ["user", "alumni", "admin"],
    default: 'alumni',
  },
  isVarified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
