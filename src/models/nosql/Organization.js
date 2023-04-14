const { model, Schema } = require('mongoose')


const OrganizationSchema = new Schema(
    {
        organization: {type: String},
        work: {type: String},
        email: {type: String, required: true, unique: true},
        fullname: {type: String},
        phone: {type: String},
        post: {type: String},
        assistants: {type: Number},
        city: {type: String},
        social: {type: Object},
        view: {type: String},
        origin: {type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model('Organization', OrganizationSchema)