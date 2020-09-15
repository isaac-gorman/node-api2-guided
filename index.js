const express = require("express");
// const users = require("./users/users-model");

const userRoutes = require("./users/users-router");

const server = express();
const port = 4000;

server.use(express.json());

server.use("/users", userRoutes);

server.get("/", (req, res) => {
  res.send("Welcome to da JUNGLE!!!!");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
