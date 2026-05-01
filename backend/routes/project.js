import express from "express";
import Project from "../models/Project.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = express.Router();

router.post("/", auth, authorize(["admin"]), async (req, res) => {
  const project = await Project.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.json(project);
});

router.get("/", auth, async (req, res) => {
  const projects = await Project.find({
    members: req.user.id
  }).populate("members");
  res.json(projects);
});

export default router;
