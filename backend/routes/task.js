import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({
    assignedTo: req.user.id
  });
  res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});

export default router;
