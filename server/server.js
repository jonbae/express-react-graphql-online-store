const models = require("./models");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../config/keys.js").MONGO_URI;
const schema = require("./schema/schema");
const expressGraphQL = require("express-graphql");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  // now we are accepting the request in our middleware
  expressGraphQL((req) => {
    return {
      schema,
      // we are receiving the request and can check for our
      // auth token under headers
      context: {
        token: req.headers.authorization,
      },
      graphiql: true,
    };
  })
);

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

module.exports = app;
