const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URL;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected to MongoDB");
  } catch {
    console.log(error);
  }
}

connect();

app.listen(8000, () => {
  console.log("server started on port 8000");
});
