const mongooseDelete = require("mongoose-delete");
const { model, Schema } = require("mongoose");

const CustomerSchema = new Schema(
  {
    fullname: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    organization: { type: String },
    work: { type: String },
    cargo: { type: String },
    phone: { type: String },
    area: {
      type: String,
      enum: [
        "Salud Física",
        "Salud Mental",
        "Salud Social",
        "Salud Medio Ambiental",
      ],
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
