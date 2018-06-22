"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');

const app           = express();


app.use(bodyParser.urlencoded({ extended: true }));
console.log(__dirname)
app.use(nodeSassMiddleware({
    src: path.join(__dirname, '../src'),
    dest: path.join(__dirname, '../public/styles'),
    debug: true,
    outputStyle: 'compressed'
}));

app.use(express.static("public"));


// The in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db");

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});



