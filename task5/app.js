if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");
const postRoute = require("./routes/postRoute");

const app = express();
const port = 3000;
let MONGO_URL = process.env.MONGODB_URL;

main()
  .then((res) => {
    console.log("Connection is Established To DataBase");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(req.method);
  next();
});

//index route
app.get("/", (req, res) => {
  res.render("index");
});

//Routers
app.use("/posts", postRoute);

//Page Not Found Route
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

//Error-Handling MiddleWare
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

//Starting The Server..
app.listen(port, () => {
  console.log(`Listening to port:${port}`);
});
