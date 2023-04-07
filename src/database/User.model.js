// const { Schema, model, Types } = require("mongoose");
// const bcrypt = require("bcryptjs");

// const User = new Schema(
//   {
//     // _id: {type: Schema.Types.ObjectId, auto: true},
//     firstname: { type: String, require: true },
//     lastname: { type: String, require: true },
//     username: { type: String, unique: true },
//     email: { type: String, unique: true },
//     password: { type: String, require: true },
//     lastLogin: { type: Date },
//     avatar: { type: String },
//     token: { type: String },
//     status: {type: String},
//     slug: { type: String, slug: "username" },
//     roles: [
//       {
//         type: Types.ObjectId,
//         ref: "Rolee",
//       },
//     ],
//     blogs: [
//       {
//         type: Types.ObjectId,
//         ref: "Blogg"
//       }
//     ]
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// )

// User.statics.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

// User.statics.comparePassword = async (password, recivePassword) => {
//   return await bcrypt.compare(password, recivePassword);
// };

// module.exports = model("User", User);
