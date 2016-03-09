// setup =========================
// require dependencies
require("babel-polyfill");

var express = require("express")
var app = express();
var port = process.env.PORT || 4200;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var cors = require("cors")
// var jwt = require("express-jwt");
var env = require("./env");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var configDB = require("./config/database.js");

var { getTranslations } = require("./app/middleware/bridge")

getTranslations();
// configuration =========================
mongoose.connect(configDB.url); //Connects to default connection pool - dev only

// var jwtCheck = jwt({
//   secret: new Buffer(env.auth0.secret, "base64"),
//   audience: env.auth0.id
// });

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
