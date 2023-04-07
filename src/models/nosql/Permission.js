const { Schema, model } = require('mongoose')

const Permission = new Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
   /*  roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
    }] */
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Permission', Permission)