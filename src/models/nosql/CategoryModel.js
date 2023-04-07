const {model, Schema, Types} = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const CategorySchema = new Schema({
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
}, {
    versionKey: false,
    timestamps: true
})

CategorySchema.plugin(mongooseDelete, { overrideMethods: 'all' })

module.exports = model('CategoryTest', CategorySchema)