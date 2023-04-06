const { Schema, model } = require('mongoose')

const Suscribers=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    notifications: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('Suscribers', Suscribers)