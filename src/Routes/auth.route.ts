import express from "express";

const _ = express.Router();

_.post("/login", (req, res) => {
  res.send("login");
});

export default _;
