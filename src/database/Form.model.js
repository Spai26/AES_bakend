const { Schema, model} = require('mongoose')

const Form = new Schema({
   name: { type: String, required: false},
   nameCompany: { type: String, required: false},
   nameInstructor: { type: String, required: false},
   nameOrganization: { type: String, required: false},
   completeName: { type: String, required: false},
   phone: { type: String, required: false},
   country: { type: String, required: false},
   post: { type: String, required: false}, //cargo
   email: { type: String, required: false},
   position: {type: String, required: false}, //puesto
   city: { type: String, required: false},
   mission: { type: String, required: false},
   numberMiembres: { type: Number, required: false}, 
   origin: { type: String, required: true}
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model("Form", Form)