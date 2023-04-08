const { Schema, model, default: mongoose} = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug)

const Blog = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    slug: { type: String, slug: "title" },
    status: { type: String, required: true},
    description: { type: String, required: true },
    image: { type: String, required: true },
    author: String,
    category: [{ type: String }],
    tags: [{type: String}]
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

module.exports = model("Blog", Blog)