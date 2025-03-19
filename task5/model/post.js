const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 10,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 50,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
