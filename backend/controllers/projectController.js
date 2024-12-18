import Project from "../models/projectModel.js";
import Progress from "../models/progressModel.js";

// Get all projects
// export const getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching projects" });
//   }
// };

export const getProjects = async (req, res) => {
  try {
    const { role, userId } = req.user; // Assuming `req.user` contains user details.
    let projects;

    if (role === "admin") {
      // Admin can access all projects
      projects = await Project.find();
    } else {
      // Other roles can only access projects assigned to them
      projects = await Project.find({ assignedTo: userId });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
};

// Accept a project
export const acceptProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.status !== "available") {
      return res.status(400).json({ message: "Project is not available" });
    }
    project.assignedTo = req.user.userId;
    project.status = "assigned";
    await project.save();
    await Progress.create({ user: req.user.userId, project: project._id });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error accepting project" });
  }
};
