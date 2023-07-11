const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkouts,
} = require("../controllers/workoutController");

const router = express.Router();

// get all workouts
router.get("/", getWorkouts);

//GET A SINGLE WORKOUT
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkouts);

module.exports = router;
