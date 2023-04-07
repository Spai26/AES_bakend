const mongooseDelete = require("mongoose-delete");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    lastLogin: { type: Date },
    avatar: { type: String },
    status: { type: String, enum: ["active", "desactive"], default: "active" },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },

    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, recivePassword) => {
  return await bcrypt.compare(password, recivePassword);
};

module.exports = model("User", UserSchema);