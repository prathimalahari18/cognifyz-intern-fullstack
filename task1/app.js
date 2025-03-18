const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send("Your message has been recieved");
});
app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("login form submitted");
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
