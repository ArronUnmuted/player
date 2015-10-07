/* global require, module, __dirname */
var path = require("path");
var express = require("express");
var app = express();

app.use(express.static("dev/"));

app.get("/*", function (req, res) {
  if (req.originalUrl.indexOf(".css") !== -1 || req.originalUrl.indexOf(".js") !== -1 || req.originalUrl.indexOf(".html") !== -1 || req.originalUrl.indexOf(".json") !== -1) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.join(__dirname, "dev/index.html"));
});

module.exports = app;
