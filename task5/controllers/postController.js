const Post = require("../Models/post");

module.exports.allPosts = async (req, res) => {
  const posts = await Post.find({});
  res.render("posts/index.ejs", { posts });
};

module.exports.postCreateForm = (req, res, next) => {
  res.render("posts/new.ejs");
};

module.exports.createPost = async (req, res) => {
  let { post } = req.body;

  let NewPost = new Post(post);
  const newPost = await NewPost.save();
  res.render("posts/show.ejs", { post: newPost });
};

module.exports.showPost = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const post = await Post.findById(id);
  res.render("posts/show", { post });
};

module.exports.updatePost = async (req, res) => {
  let { id } = req.params;
  let newPost = await Post.findByIdAndUpdate(id, req.body.post);
  res.redirect(`/posts/${id}`);
};

module.exports.deletePost = async (req, res) => {
  let { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect("/posts");
};

module.exports.postEditForm = async (req, res) => {
  let { id } = req.params;
  const post = await Post.findById(id);
  res.render("posts/edit.ejs", { post });
};
