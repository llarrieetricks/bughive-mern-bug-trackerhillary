const Bug = require("../models/Bug");
const User = require("../models/User");
const mongoose = require("mongoose");

const canModifyBug = (user, bug) => {
  return (
    user?.role === "admin" || bug.createdBy.toString() === user?._id.toString()
  );
};

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Private
const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find()
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single bug
// @route   GET /api/bugs/:id
// @access  Private
const getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new bug
// @route   POST /api/bugs
// @access  Private
const createBug = async (req, res) => {
  try {
    const { title, description, priority, project, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Please provide title and description" });
    }

    const bug = await Bug.create({
      title,
      description,
      priority,
      project,
      tags,
      createdBy: req.user._id,
    });

    const populatedBug = await Bug.findById(bug._id)
      .populate("createdBy", "name email");

    res.status(201).json(populatedBug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update bug
// @route   PUT /api/bugs/:id
// @access  Private
const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    if (!canModifyBug(req.user, bug)) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this bug" });
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "assignedTo",
      "project",
      "tags",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    if (Object.prototype.hasOwnProperty.call(updates, "assignedTo")) {
      if (updates.assignedTo === null || updates.assignedTo === "") {
        updates.assignedTo = null;
      } else if (!mongoose.isValidObjectId(updates.assignedTo)) {
        return res.status(400).json({ message: "Invalid assigned user id" });
      } else {
        const assignedUser = await User.findById(updates.assignedTo).select("_id");
        if (!assignedUser) {
          return res.status(404).json({ message: "Assigned user not found" });
        }
      }
    }

    const updatedBug = await Bug.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    )
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(updatedBug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete bug
// @route   DELETE /api/bugs/:id
// @access  Private
const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    if (!canModifyBug(req.user, bug)) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this bug" });
    }

    await Bug.findByIdAndDelete(req.params.id);
    res.json({ message: "Bug deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign bug to user
// @route   PUT /api/bugs/:id/assign
// @access  Private
const assignBug = async (req, res) => {
  try {
    const { userId } = req.body;

    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    if (!canModifyBug(req.user, bug)) {
      return res
        .status(403)
        .json({ message: "Not authorized to assign this bug" });
    }

    if (typeof userId === "undefined") {
      return res.status(400).json({ message: "userId is required" });
    }

    if (userId === null || userId === "") {
      bug.assignedTo = null;
    } else {
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user id" });
      }

      const assignedUser = await User.findById(userId).select("_id");
      if (!assignedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      bug.assignedTo = userId;
    }

    await bug.save();

    const updatedBug = await Bug.findById(bug._id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(updatedBug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
  assignBug,
};
