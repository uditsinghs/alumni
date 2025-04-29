import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
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
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);
