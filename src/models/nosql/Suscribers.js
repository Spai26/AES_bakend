const { Schema, model } = require("mongoose");

const SubcriberSchema = new Schema(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("Subcriber", SubcriberSchema);
