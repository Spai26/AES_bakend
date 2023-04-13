const mongooseDelete = require("mongoose-delete");
const { Schema, model } = require("mongoose");

/**
 * !TODO: modelo para subir archivos
 */
const ResourseSchema = new Schema(
  {
    origin: {
      type: String,
      enum: ["videos", "images"],
    },
    url: { type: String },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ResourseSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("Resource", ResourseSchema);
