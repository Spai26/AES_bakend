const handlerHttpError = require("../../utils/handlerHttpError");
const { specialist, person } = require("../../models");

const addSpecialist = async (req, res) => {
  const info = await specialist.find({});
  res.status(200).send(info);
};

const detailSpecialistForid = async (req, res) => {
    try {
      const { id } = req.params;
  
      const isExist = await specialist.findOne({ _id: id });
      if (!isExist) {
        return handlerHttpError(res, "Registro de especialista no existe!", 404);
      }
      const result = await specialist.findById(id);
      res.status(200).json(result);
    } catch (error) {
      handlerHttpError(res, "Este especialista no es valido", 404);
    }
};

const registerSpecialist = async (req, res) => {
    try {
        const { fullname, email, area, country, phone, filepath } = req.body;
         
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
        handlerHttpError(res, "Specialist no pudo registrarse ", 404);
      }
    };

  const specialistUpdate = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, area, country, phone, filepath, view } = req.body;
    try {
      const Specialist = await specialist.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            fullname: fullname,
            email: email,
            area: area,
            country: country,
            phone: phone,
            filepath: filepath,
            view: view
          }
        });
      res.status(200).json({ message: "Especialista actualizado" });
    } catch (error) {
      handlerHttpError(res, "Especialista no pudo actualizarse", 404)
    }
  };

module.exports = {
  registerSpecialist,
  addSpecialist,
  detailSpecialistForid,
  specialistUpdate
};
