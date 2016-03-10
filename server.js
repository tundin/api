// setup =========================
// require dependencies

var express = require("express")
var app = express();
var port = process.env.PORT || 4200;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var cors = require("cors")
var env = require("./env");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var configDB = require("./config/database.js");

// configuration =========================
mongoose.connect(configDB.url); //Connects to default connection pool - dev only

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

app.set("view engine", "jade");

app.use(cors());

// routes =========================
require("./app/routes.js")(app, passport);

// launch =========================
app.listen(port);
console.log("Going down on port ", port);
