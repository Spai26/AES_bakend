const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Role", RoleSchema);
