const { Schema, model, default: mongoose, Types } = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
// const mongoose_delete = require('mongoose-delete');

const Blog = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    slug: { type: String, slug: "title" },
    status: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
    author: String,
    category: [{ type: String }],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



// Blog.plugin(mongoose_delete)


module.exports = model("Blog", Blog);
