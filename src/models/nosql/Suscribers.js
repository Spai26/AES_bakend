const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const SubcriberSchema = new Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

SubcriberSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("Subcriber", SubcriberSchema);
