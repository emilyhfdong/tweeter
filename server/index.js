"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');
const app           = express();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));

//use SASS middeware
app.use(nodeSassMiddleware({
    src: path.join(__dirname, '../src'),
    dest: path.join(__dirname, '../public/styles'),
    debug: true,
    outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, '../public')));

//commect to database
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



