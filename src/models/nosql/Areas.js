const { model, Schema } = require('mongoose')

const areaSchema = new Schema(
    {
        name: {type: String, required: true, unique: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model('area', areaSchema)