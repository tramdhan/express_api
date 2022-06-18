require("module-alias/register");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");
var cors = require("cors");
var fs = require("fs");

var envpath = "";

if (fs.existsSync("/var/www")) {
  envpath = "/var/config/.env"; // common env on server, serving multiple apps
} else {
  envpath = "./var/config/.env"; // local
}

require("dotenv").config({
  path: envpath,
});

var app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  if (req.headers.origin === "http://localhost:3000") {
    console.log("ORIGIN ", req.headers.origin);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth-Token");
  }

  app.use(cors());

  // support API requests only from authorized origins
  if (req.headers.origin !== "http://localhost:3000") {
    if (req.headers.origin !== process.env.CLIENT_DOMAIN) {
      res.status(400).send({
        error: "Forbidden",
        code: 129,
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// SETUP ROUTES
var routesFolder = path.resolve(__dirname + "/routes");
const glob = require("glob");
glob.sync("**/*.js", { cwd: routesFolder }).map((filename) => {
  let middleware = filename.substring(0, filename.lastIndexOf("/"));

  if (filename.startsWith("index")) {
    app.use("/", require(routesFolder + "/" + filename));
  } else {
    middleware = "/" + middleware + "/";
    app.use(middleware, require(routesFolder + "/" + filename));
    // console.log("API Routes: " + middleware);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
