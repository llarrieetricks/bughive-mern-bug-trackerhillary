const express = require("express");
const router = express.Router();
const {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
  assignBug,
} = require("../controllers/bugController");
const { protect } = require("../middleware/auth");

// All routes are protected
router.use(protect);

router.route("/").get(getBugs).post(createBug);
router.route("/:id").get(getBugById).put(updateBug).delete(deleteBug);
router.route("/:id/assign").put(assignBug);

module.exports = router;
