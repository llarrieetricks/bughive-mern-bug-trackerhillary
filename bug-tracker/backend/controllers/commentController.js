const Comment = require("../models/Comment");
const Bug = require("../models/Bug");

// @desc    Get comments for a bug
// @route   GET /api/bugs/:bugId/comments
// @access  Private
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ bug: req.params.bugId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create comment
// @route   POST /api/bugs/:bugId/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // Check if bug exists
    const bug = await Bug.findById(req.params.bugId);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    const comment = await Comment.create({
      bug: req.params.bugId,
      user: req.user._id,
      text,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name email");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user owns the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
};
