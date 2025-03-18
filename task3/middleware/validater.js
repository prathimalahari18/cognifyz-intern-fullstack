module.exports.validateForm = (req, res, next) => {
  const { username, email, age, password } = req.body;

  if (username.trim() === "") {
    throw new Error("username is required");
  }
  if (username.length < 3) {
    throw new Error("UserName must be three characters long.");
  }
  if (password === "") {
    throw new Error("password is required");
  }
  if (password.length < 8) {
    throw new Error("password must be at least 8 characters long");
  }

  if (email === "") {
    throw new Error("email is Required");
  }

  if (age < 16) {
    throw new Error("age must be equal or greater than 16");
  }
  next();
};
