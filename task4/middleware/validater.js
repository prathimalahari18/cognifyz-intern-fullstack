module.exports.validateForm = (req, res, next) => {
  const { title, level, content, books } = req.body;

  if (!title) throw new Error("title should not be empty");
  if (title.length < 10) throw new Error("title must be 10 character long.");
  if (title.split(" ").length < 2)
    throw new Error("title must contain 2 words");

  if (!content) throw new Error("content is required");
  if (content.length < 50)
    throw new Error("content length should not be less than 50 characters");

  if (!level) throw new Error("Urgency level is required");
  if (level < 1) throw new Error("Urgency level should be higher than 0");
  if (level > 10) throw new Error("Urgency level should be less than 10");

  if (!books) req.body.books = [];
  next();
};

module.exports.validateAuth = (req, res, next) => {
  const { username, password } = req.body;

  if (!username) throw new Error("Username must not be empty");
  if (!password) throw new Error("Password is empty");

  if (username.length < 3) throw new Error("Username must be 3 character");
  if (password.length < 8)
    throw new Error("password length should not be less than 8");

  let countOfLowerCase = 0;
  let countOfSpecialChar = 0;
  let countOfNumbers = 0;
  let countOfUpperCase = 0;
  let countOfSpace = 0;

  const containsUppercase = (ch) => /[A-Z]/.test(ch);
  const containsLowercase = (ch) => /[a-z]/.test(ch);
  const containsSpecialChar = (ch) =>
    /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

  for (let i = 0; i < password.length; i++) {
    let ch = password.charAt(i);
    if (ch === " ") countOfSpace++;
    else if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }

  if (countOfSpace > 0) throw new Error("password should not contain space");
  if (countOfLowerCase < 1)
    throw new Error("password must contain lowercase character");
  if (countOfUpperCase < 1)
    throw new Error("password must contain uppercase Character");
  if (countOfNumbers < 1)
    throw new Error("password must contain Number character");
  if (countOfSpecialChar < 1)
    throw new Error("password must contain Special character");
  next();
};
