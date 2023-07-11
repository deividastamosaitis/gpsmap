require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const workoutsRoutes = require("./routes/workouts");
const markersRoutes = require("./routes/markers");

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutsRoutes);
app.use("/api/markers", markersRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
