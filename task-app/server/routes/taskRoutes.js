import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Get tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

// Create task
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = new Task({
    title,
    description,
    user: req.user
  });

  await task.save();
  res.json(task);
});

// Update task
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = req.body.status || task.status;
  task.title = req.body.title || task.title;

  await task.save();
  res.json(task);
});


// Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

export default router;
