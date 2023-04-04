const { Schema, model, Types } = require("mongoose");

const Role = new Schema(
  {
    _id: {type: Schema.Types.ObjectId},
    name: { type: String, unique: true },
    moderador: {type: String, unique: true}
    /*  description: { type: String, required: true }, */
    /*  permissions: [ //Dado que la relacion entre Roles y permisos es de muchos a muchos, deberiamos crear una tabla intermedia?
      {
        ref: "Permission",
        type: Schema.Types.ObjectId,
      }
    ] */
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Role", Role);
