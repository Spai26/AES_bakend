const mongooseDelete = require("mongoose-delete");
const { model, Schema } = require("mongoose");

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    assistants: { type: Number },
    social: { type: Object },
    origin: [{
      type: String,
      enum: ["event", "especialista", "institución", "organización"],
    }],
    country: { type: String },
    city: { type: String },
    filepath: { type: String },
    view: { type: Boolean, default: false}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

CustomerSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("Customer", CustomerSchema);
