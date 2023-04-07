const mongooseDelete = require("mongoose-delete");
const { Schema, model } = require("mongoose");

/**
 * !TODO: modelo para subir archivos
 */
const ResourseSchema = new Schema(
  {
    name: { type: String },
    filename: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ResourseSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = model("Resources", ResourseSchema);
