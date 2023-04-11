const mongooseDelete = require("mongoose-delete");
const { model, Schema } = require("mongoose");

const CustomerSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    origin: {
      type: String,
      enum: ["event", "especialista", "institucion", "organizacion"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

CustomerSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("Customer", CustomerSchema);
