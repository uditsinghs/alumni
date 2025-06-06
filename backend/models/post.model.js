import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
    },
    public_id: {
      type: String
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    }
  ]
}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema);
