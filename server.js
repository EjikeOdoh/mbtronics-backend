const express = require("express");

//connect to database
const connectDB = require("./db/connectDB");
require("dotenv").config();

const users = require("./routes/users");
const orders = require("./routes/orders");

//models
const User = require("./models/User");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

// routes
app.get("/", (req, res) => {
  res.status(200).json({ status: "Successful", data: {} });
});

app.use("/api/v1/users", users);
app.use("/api/v1/orders", orders);

// app.post("/new-user", async (req, res) => {
//   const newUser = await User.create(req.body);
//   res.json({
//     newUser,
//   });
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log();
  } catch (error) {
    console.log(error);
  } finally {
    app.listen(port, () => {
      console.log(`Server up on port ${port}`);
    });
  }
};

start();
