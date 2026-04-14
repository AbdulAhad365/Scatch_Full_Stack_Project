const mongoose = require("mongoose");
const config=require("config")
const debug = require("debug")("development:mongoose");

async function main() {
  await mongoose
    .connect(`${config.get("MONGODB_URL")}/day12`)
    .then(function () {
      debug("connected to mongodDB");
    })
    .catch(function () {
      debug("some error occurs while connecting");
    });
}

module.exports = main;
