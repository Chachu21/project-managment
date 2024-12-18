import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tasks: [
    {
      description: { type: String, required: true },
      points: { type: Number, required: true },
    },
  ],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  status: {
    type: String,
    enum: ["available", "assigned", "completed"],
    default: "available",
  },
});

export default mongoose.model("Project", projectSchema);
