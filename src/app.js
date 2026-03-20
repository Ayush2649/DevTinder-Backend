const express = require("express");

const app = express();

app.get("/getAllData", (req, res) => {
  try {
    throw new Error("Something went wrong while fetching data");
  } catch (err) {
    res.status(500).send("Something went wrong, please contact support");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
