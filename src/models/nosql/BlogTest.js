const { Schema, model, default: mongoose } = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const mongooseDelete = require('mongoose-delete');

const BlogSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    slug: { type: String, slug: "title" },
    status: {
      type: String,
      required: false,
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
    author: String,
    category: [{ type: String }],
    // categories: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Category",
    //   },
    // ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BlogSchema.plugin(mongooseDelete, { overrideMethods: "all" })

module.exports = model("BlogTest", BlogSchema);