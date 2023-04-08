const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, recivePassword) => {
  return await bcrypt.compare(password, recivePassword);
};

module.exports = model("UserTest", UserSchema);