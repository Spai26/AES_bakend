const {getAllFormsController} = require('../../controllers/Form/form.controllers')

const getAll = async (req, res, next) => {
  try{
    const result = await getAllFormsController()
    res.status(200).json(result)
  }catch(err){
    next(err)
  } 
}

module.exports = getAll