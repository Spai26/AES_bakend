const Permission = require('../../database/Permission.model')
const permissionController = require('../../controllers/Permission/permission.controller')

const getAllPermissions = async (request, response, next) => {
    try {
        const allPermissions = await permissionController.getAllPermissions();
        response.status(200).json(allPermissions);
    } catch (error) {
        next(error)
        //response.status(400).json({ message: error.message })
    }
}


const createPermission = async (request, response, next) => {
    const { name, description } = request.body;
    console.log('entro')
    try {
        console.log('dasdasd')

        const result = await permissionController.createPermission(name, description);
        if (!name || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // const newRole = result.save()

        response.status(200).json(result);


    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPermissions,
    createPermission
}