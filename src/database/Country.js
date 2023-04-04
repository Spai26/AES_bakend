const { Schema, model } = require("mongoose");

const Country = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("Country", Country);
