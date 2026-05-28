// import mongoose from "mongoose";
const mongoose = require('mongoose'); 


const movieSchema = new mongoose.Schema({
  plot: {
    type: "String",
  },
  title: {
    type: "String",
  },
  lastupdated: {
    type: "Date",
  },
  year: {
    type: "Number",
  },
});

export default mongoose.model("Movie", movieSchema);
