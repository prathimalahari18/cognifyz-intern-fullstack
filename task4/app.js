const createError = require("http-errors");
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const { validateForm, validateAuth } = require("./middleware/validater");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let formData = [];
let userData = [];

app.get("/", (req, res) => {
  res.render("main.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  formData.push(req.body);
  res.render("Thank you for submiting the Post");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up.ejs");
});

app.post("/sign-up", validateAuth, (req, res) => {
  const { username, password } = req.body;

  const user = userData.find((user) => user.username === username);
  if (user) {
    throw new Error("Username already exists.");
  }
  userData.push({ username, password });
  res.send("Sign form was submitted successfully");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", validateAuth, (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  console.log(userData);
  const user = userData.find((user) => user.username === username);

  if (!user || user.password !== password) {
    throw new Error("Wrong password or username.");
  }
  res.send("Logged in successfully");
});

app.post("/create", validateForm, (req, res) => {
  let { username, email, password, age, address, books = [] } = req.body;
  formData.push({ username, email, password, age, address, books });
  res.send("Thank you your form has been submitted successfully.");
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

//start the server
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
