const { Schema, model } = require("mongoose");

const Event = new Schema(
  {
    title: { type: String, require: true },
    frontpage: { type: String },
    date: { type: String },
    location: { type: String, require: true },
    description: { type: String, require: true },
    slug : { type: String, slug: "title" },
    subscribers: [],
    category: [],
    deleted: { type: Boolean, default: false }, //para el borrado lógico
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Event", Event);
