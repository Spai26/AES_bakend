const { Schema, model} = require('mongoose')

const FormSchema = new Schema({
   name: { type: String, required: false},
   nameCompany: { type: String, required: false},
   nameInstructor: { type: String, required: false},
   nameOrganization: { type: String, required: false},
   phone: { type: String, required: false},
   country: { type: String, required: false},
   workShop: { type: String, required: false}, //taller
   email: { type: String, required: false},
   position: {type: String, required: false}, //puesto
   city: { type: String, required: false},
   mission: { type: String, required: false},
   numberMiembres: { type: Number, required: false}, 
   origin: { type: String, required: true},
   socialNetworks: {type: Object, required: false}
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model("FormSchema", FormSchema)