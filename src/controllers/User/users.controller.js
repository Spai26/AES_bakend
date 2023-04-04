const User = require('../../database/User.model')
const Blog = require('../../database/Blog.model')
const Categorias = require('../../database/CategoriasBlog.model')

const createUser = async ({firstName, lastName, userName , avatar, emaill, passwordd})=> {
   try{
    const create = new User({
      firstname: firstName,
      lastname: lastName,
      username: userName,
      avatar: avatar,
      email: emaill,
      password: passwordd,
      status: "active",  
    })
    await create.save(); 

    return create;
   }catch(err){
    throw new Error(err)
   } 
};

const isAuthorized = async ({user, id}) => {
  
  if (!user || !["editor", "admin"].includes(user.roles)) {
    return false;
  }

  const userr =await User.find(user => user.id === id);
  
  if (!userr) {
    return false;
  }

  if (userr.role === "admin") {
    return true;
  }

  return userr.id === user.id;
}

const updateUserFields = async ({slug, username, password, avatar, status, blogs}) => {
  let user = await User.findOne({username: { $regex: new RegExp(`^${slug}$`, 'i')}}).populate('blogs')

  if(user){
    if(user.firstname!==username || user.password!==password || user.avatar!==avatar || user.status!==status || JSON.stringify(user.blogs) !== JSON.stringify(blogs)){
      user.username = username
      user.password = password
      user.avatar = avatar
      user.status = status
      
        const newBlog = new Blog({
          title: blogs.title,
          slug: blogs.slug,
          status: blogs.status,
          description: blogs.description,
          image: blogs.image,
          author: blogs.author,  
          categories: new Categorias({name: blogs.categories}) 
        })

        user.blogs.push(newBlog)

      await user.save()  
      return user
    }else{
     throw new Error(`No hay cambios que realizar`)
    } 
  }else{
    throw new Error(`Usuario no encontrado`)
  }
}

module.exports = {
    createUser,
    isAuthorized,
    updateUserFields
}