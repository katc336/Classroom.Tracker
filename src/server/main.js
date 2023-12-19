const express = require("express");
require('dotenv').config();
const morgan = require("morgan");

const ViteExpress = require("vite-express");
const app = express();
const { authMiddleware } = require("./utils");

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware);

//Test Route
app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

//Backend Routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
