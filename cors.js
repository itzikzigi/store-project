const cors = require("cors");
const express = require("express");
const app = express();

app.use(
  cors({
    optionsSuccessStatus: 200,
  })
);

module.exports = app;
