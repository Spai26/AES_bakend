const {Schema, model} = require('mongoose')

const TagSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdInDb: {
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timestamps: true
})

module.exports = model('TagSchema', TagSchema)