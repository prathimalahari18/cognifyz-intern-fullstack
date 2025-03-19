const data = [
  {
    title: "justo nec condimentum",
    content:
      "penatibus et magnis dis parturient montes nascetur ridiculus mus etiam",
    owner: "Marrilee Hing",
  },
  {
    title: "interdum in ante vestibulum",
    content:
      "quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci",
    owner: "Niki Yakovliv",
  },
  {
    title: "accumsan felis ut at",
    content:
      "magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum",
    owner: "Kipper Rintoul",
  },
  {
    title: "vulputate ut",
    content:
      "consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam",
    owner: "Adelle Hambrook",
  },
  {
    title: "donec quis",
    content:
      "rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis",
    owner: "Rowan Wragg",
  },
  {
    title: "sed nisl nunc rhoncus",
    content:
      "sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede",
    owner: "Ketti Lackmann",
  },
  {
    title: "at ipsum ac tellus semper",
    content:
      "nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit",
    owner: "Rudolph Darnody",
  },
  {
    title: "tortor duis mattis egestas",
    content:
      "velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum",
    owner: "Bria Mankor",
  },
  {
    title: "sociis natoque",
    content:
      "neque libero convallis eget eleifend luctus ultricies eu nibh quisque",
    owner: "Douglas Clitherow",
  },
  {
    title: "odio porttitor id",
    content:
      "sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere",
    owner: "William Worlidge",
  },
];

const mongoose = require("mongoose");
const Post = require("../Models/post");

let MONGO_URL = process.env.MONGODB_URL;

main()
  .then((res) => {
    console.log("Connection is Established To DataBase");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/cognifyztask5");
}

async function seed() {
  const docs = await Post.create(data);
  console.log(docs);
}

seed();
