const { Router } = require("express");
const createUser = require('../handlers/users/users')
const toggleUser = require('../handlers/users/modificUser.handlers')
const UserTest = require("../models/nosql/UserTest");
const userRoute = Router();

userRoute.get("/", async (req, res, next) => {
 let {search} = req.query; 
 try{
  if(search){
    const searchUser = await UserTest.findOne({username: { $regex: new RegExp(`^${search}$`, 'i')}})
    res.status(200).json(searchUser)
  }
   const allUser = await UserTest.find({});
   res.status(200).json(allUser);
 }catch(err){
  next(err)
 }
});

// userRoute.post('/', createUser);
// userRoute.put('/toggleUser', toggleUser) //implementar

module.exports = userRoute;
