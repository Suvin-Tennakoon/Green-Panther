const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose

  .connect(
    "mongodb+srv://greenpanther:greenpanther@cluster0.g9rosfx.mongodb.net/?retryWrites=true&w=majority",

    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((err) => [console.log(err)]);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is Running");
});

const chmRoutes = require("./routes/it20911744.router");
app.use("/api/20911744", chmRoutes);

const suvRoutes = require("./routes/it20407384.router");
app.use("/api/20407384", suvRoutes);

const dinRoutes = require("./routes/it20041120.router");
app.use("/api/20041120", dinRoutes);

const visRoutes = require("./routes/it20261900.router");
app.use("/api/20261900", visRoutes);
