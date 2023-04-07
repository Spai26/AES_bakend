const userController = require("../../controllers/User/users.controller");
const uploadImage = require('../../middleware/generateImage')

const createUser = async (req, res, next) => {
  const { firstName, lastName, userName , email, password, avatar} = req.body;

 if(firstName!==null && lastName!==null && userName!==null && email!==null && password!==null ){
   try {
    let avatarUrl = avatar || `https://ui-avatars.com/api/?name=${firstName}${lastName}`;
      if (!avatarUrl) {
        const file = req.file;
        console.log(file)
        if (file) {
          const imagePath = file.path;
          const uploadResult = await uploadImage(imagePath)
          avatarUrl = uploadResult.secure_url;
        }
      }

     const result = await userController.createUser({firstName: firstName, lastName: lastName, userName: userName, avatar: avatarUrl, emaill: email, passwordd: password});
     res.status(200).json(result);
   } catch (error) {
     next(error)
   }
 }else{
  throw new Error('Debe ingresar todos los campos obligatorios !')
 } 
}

module.exports = createUser;
