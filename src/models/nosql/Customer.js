const mongooseDelete = require("mongoose-delete");
const { model, Schema } = require("mongoose");

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

CustomerSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("Customer", CustomerSchema);
