const { Schema, model, default: mongoose, Types } = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const BlogSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("BlogTest", BlogSchema);
