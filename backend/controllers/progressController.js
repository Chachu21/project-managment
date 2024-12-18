import Progress from "../models/progressModel.js";
import Project from "../models/projectModel.js";

// Get progress for the authenticated user
export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.userId }).populate(
      "project"
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress" });
  }
};

// Mark a task as complete for the authenticated user
export const completeTask = async (req, res) => {
  try {
    const { taskIndex } = req.body;
    const progress = await Progress.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    const project = await Project.findById(progress.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!progress.completedTasks.includes(taskIndex)) {
      progress.completedTasks.push(taskIndex);
      progress.score += project.tasks[taskIndex].points;
      await progress.save();
    }

    if (progress.completedTasks.length === project.tasks.length) {
      project.status = "completed";
      await project.save();
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error completing task" });
  }
};
