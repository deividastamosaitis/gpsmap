const Marker = require("../models/markerModel");
const mongoose = require("mongoose");

// get all workouts
const getMarkers = async (req, res) => {
  const markers = await Marker.find({}).sort({ createdAt: -1 });

  res.status(200).json(markers);
};

//get a single workout
const getMarker = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such marker" });
  }
  const marker = await Marker.findById(id);

  if (!marker) {
    return res.status(404).json({ error: "No such marker" });
  }

  res.status(200).json(marker);
};

//create a new workout
const createMarker = async (req, res) => {
  const { vardas, atvykti, status, telefonas, info, pastas, lat, lng } =
    req.body;

  //add doc to db
  try {
    const marker = await Marker.create({
      vardas,
      atvykti,
      status,
      telefonas,
      info,
      pastas,
      lat,
      lng,
    });
    res.status(200).json(marker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a marker
const deleteMarker = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such marker" });
  }

  const marker = await Marker.findOneAndDelete({ _id: id });

  if (!marker) {
    return res.status(404).json({ error: "No such marker" });
  }

  res.status(200).json(marker);
};

//update a marker
const updateMarker = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such marker" });
  }

  const marker = await Marker.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!marker) {
    return res.status(404).json({ error: "No such marker" });
  }

  res.status(200).json(marker);
};

module.exports = {
  createMarker,
  getMarkers,
  getMarker,
  deleteMarker,
  updateMarker,
};
