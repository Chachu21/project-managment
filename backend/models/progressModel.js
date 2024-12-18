import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  completedTasks: [{ type: Number }],
  score: { type: Number, default: 0 },
});

export default mongoose.model("Progress", progressSchema);
