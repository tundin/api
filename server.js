// setup =========================
// require dependencies

var express = require("express");
var app = express();
var port = process.env.PORT || 4200;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var jwt = require("express-jwt");
var env = require("./env");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var configDB = require("./config/database.js");

// configuration =========================
mongoose.connect(configDB.url); //Connects to default connection pool - dev only

var jwtCheck = jwt({
  secret: new Buffer(env.auth0.secret, "base64"),
  audience: env.auth0.id
});

//require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser()); // deprecated bodyParser: use individual json/urlencoded middlewares

app.set("view engine", "jade");

app.use(session({secret: "notaverygoodsecret"})); // needs to be updated for production: https://github.com/expressjs/session#sessionoptions TODO: undefined resave option; provide resave option TODO: undefined saveUninitialized option; provide saveUninitialized option
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use("/api", jwtCheck);

// routes =========================
require("./app/routes.js")(app, passport);

// launch =========================
app.listen(port);
console.log("Going down on port ", port);
