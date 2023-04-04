const { Schema, model } = require("mongoose");

const Event_Client = new Schema(
  {
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    event: { type: String, require: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Event_Client", Event_Client);