const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//connect to database
const connectDB = require("./db/connectDB");
require("dotenv").config();

const orders = require("./routes/orders");
const auth = require("./routes/auth");
const admin = require("./routes/admin");

//middleware
const authMiddleWare = require("./middleware/authentication");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 5000;

// routes
app.get("/", (req, res) => {
  res.status(200).json({ status: "Successful", data: {} });
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/orders", authMiddleWare, orders);
app.use("/api/v1/admin", admin);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  } finally {
    app.listen(port, () => {
      console.log(`Server up on port ${port}`);
    });
  }
};

start();
