const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    gender: { type: String },
    seatNo: { type: Number, unique: true },
    booked: { type: Boolean },
    color: { type: String },
    status: { type: String },
    visibility: { type: String },
    display: { type: String },
  }
 
);

module.exports = mongoose.model("passengers", productSchema);
