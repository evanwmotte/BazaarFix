const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const validateUser = require('./auth').validateUser
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config({ silent: true })
require('./auth')

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"],
}))
app.use(cookieParser())
app.use(bodyParser.raw({ limit: "100mb" }))
app.use(bodyParser.json())
app.use(validateUser)
app.use(routes)

// static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// connect to MongoDB
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// start the server
app.listen(PORT, function () {
  console.log(`Server now listening on PORT ${PORT}!`);
});