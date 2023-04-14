const { model, Schema } = require('mongoose')

const institutionSchema = new Schema(
    {
        organization: {type: String},
        email: {type: String, unique: true, required: true},
        fullname: { type: String, required: true},
        phone: { type: String},
        post: { type: String},
        city: { type: String},
        view: { type: String},
        area: [{ type: Schema.Types.ObjectId, ref: 'Area'}],
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model('Institution', institutionSchema)