// const {isAuthorized} = require('../../controllers/User/users.controller')
const {updateUserFields} = require('../../controllers/User/users.controller')
/* const User = require('../../database/User.model') */
const uploadImage = require('../../middleware/generateImage')

const toggleUser = async (req, res, next) => {
   let {slug} = req.query;
   let {username, password, avatar,status, blogs} = req.body; 
   
   if (slug !== null && slug !== undefined && (username || password || avatar || status || blogs)) {
     try {
      const getUserr = await User.findOne({username: { $regex: new RegExp(`^${slug}$`, 'i')}});
      console.log(getUserr)
      let avatarUrl = avatar || `https://ui-avatars.com/api/?name=${getUserr.firstname}${getUserr.lastname}`;
      if (!avatarUrl) {
        const file = req.file;
        if (file) {
          const imagePath = file.path;
          const uploadResult = await uploadImage(imagePath);
          avatarUrl = uploadResult.secure_url;
        }
      }
      const updatedBlog = await updateUserFields({slug: slug, username: username, password: password, avatar: avatarUrl, status: status, blogs: blogs});
      res.status(200).json(updatedBlog);
    } catch(err) {
      next(err);
    }
  } else {
    throw new Error(`Debe ingresar por lo menos el ID y propiedad a modificar`);
  }


    // if (!isAuthorized({user: req.user, id: blogId})) {
    //  return res.status(403).json({message: "No tiene permiso para modificar este usuario."});
    // }
}

module.exports = toggleUser