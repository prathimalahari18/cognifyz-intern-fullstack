const createError = require("http-errors");
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const { validateForm } = require("./middleware/validater");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const formData = [];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", validateForm, (req, res) => {
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
