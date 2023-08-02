const express = require("express");

//connect to database
const connectDB = require("./db/connectDB");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ status: "Successful" });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  } finally {
    app.listen(port, () => {
      console.log(`Server up on port ${port}`);
    });
  }
};

start();
