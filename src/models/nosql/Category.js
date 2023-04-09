const { model, Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Category", CategorySchema);
