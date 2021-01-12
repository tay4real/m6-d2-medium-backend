const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ArticleSchema = new Schema(
  {
    headLine: { type: String, required: true },
    subHead: String,
    content: { type: String, required: true },
    category: {
      name: Number,
      img: String,
    },
    author: {
      name: String,
      img: String,
    },
    cover: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema); // bounded to Users collections
