const express = require("express");
const router = express.Router();
const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/auth");

// All routes are protected
router.use(protect);

// Routes for comments on a specific bug
router.route("/bugs/:bugId/comments").get(getComments).post(createComment);

// Route for deleting a specific comment
router.route("/comments/:id").delete(deleteComment);

module.exports = router;
