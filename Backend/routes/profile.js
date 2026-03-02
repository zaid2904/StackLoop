const express = require("express");
const {
  getMyProfile,
  upsertMyProfile,
  getProfileByUsername,
} = require("../controller/profile.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/me", protect, upsertMyProfile);
router.get("/:username", getProfileByUsername);

module.exports = router;
