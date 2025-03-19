const ExpressError = require("../utils/ExpressError");

module.exports.validatePost = (req, res, next) => {
  const { title, content, owner } = req.body.post;
  console.log(req.body);
  console.log("inside the validation");

  if (!title) throw new Error("title should not be empty");
  if (title.length < 10)
    throw new ExpressError("title must be 10 character long.");

  if (!content) throw new Error("content is required");
  if (content.length < 50)
    throw new ExpressError(
      "content length should not be less than 50 characters"
    );

  if (!owner) throw new Error("your name is required");

  next();
};
