const handlerHttpError = require("../../utils/handlerHttpError");
const { specialist, person } = require("../../models");

const addSpecialist = async (req, res) => {
  const info = await specialist.find({});
  res.status(200).send(info);
};

const registerSpecialist = async (req, res) => {
    try {
        const { fullname, email, area, country, phone, filepath } = req.body;
        // Crear un nuevo registro en el modelo specialist
        const newSpecialist = new specialist({
          fullname: fullname,
          email: email,
          area: area,
          country: country,
          phone: phone,
          filepath: filepath,
        });
        await newSpecialist.save();
    
        const personRecord = await person.findOne({ email: email });
        if (!personRecord) {
        
          const newPerson = new person({
            fullname: fullname,
            email: email,
            specialist: [newSpecialist._id]
          });
          await newPerson.save();
        } else {
          
          personRecord.specialist.push(newSpecialist._id);
          await personRecord.save();
        }
        
        res.status(201).json({ message: "Specialist registrado con éxito!" });
      } catch (error) {
        console.error(error);
        handlerHttpError(res, "Specialist no pudo registrarse ", 404);
      }
    };

module.exports = {
  registerSpecialist,
  addSpecialist,
};
