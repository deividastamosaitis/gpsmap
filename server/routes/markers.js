const express = require("express");
const {
  createMarker,
  getMarkers,
  getMarker,
  deleteMarker,
  updateMarker,
} = require("../controllers/markerController");

const router = express.Router();

// get all workouts
router.get("/", getMarkers);

//GET A SINGLE WORKOUT
router.get("/:id", getMarker);

//POST a new workout
router.post("/", createMarker);

//DELETE a workout
router.delete("/:id", deleteMarker);

//UPDATE a workout
router.patch("/:id", updateMarker);

module.exports = router;
