const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const markerSchema = new Schema(
  {
    vardas: {
      type: String,
      required: true,
    },
    atvykti: {
      type: Date,
      required: true,
    },
    pastas: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    telefonas: {
      type: Number,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Marker", markerSchema);
