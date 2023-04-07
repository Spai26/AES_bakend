// const User = require('../User.model');

// const listaDeUsuarios = async () => {
//    await User.aggregate([
//     {
//         $lookup: {
//          from: 'Blog',
//          localField: 'Blog',
//          foreignField: '_id',
//          as: 'blogs',
//         },
//     },
//     {
//         $lookup: {
//          from: 'Role',
//          localField: 'Role',
//          foreignField: '_id',
//          as: 'roles',
//         },
//     },
//     {
//         $project: {
//          '_id': 1,
//          'firstname': 1,
//          'lastname': 1,
//          'username': 1,
//          'email': 1,
//          'lastLogin': 1,
//          'avatar': 1,
//          'status': 1,
//          'slug': 1,
//          'roles': 1,
//          'blogs': 1,
//          'createdAt': 1,
//          'updatedAt': 1,
//         },  
//     },
//    ]);
 
// };

// module.exports = listaDeUsuarios;