const Role = require('../../database/Role.model')
const roleController = require('../../controllers/Role/role.controller')

const getAllRoles = async (request, response, next) => {
    const { name } = request.query
    try {
        if (name) {
            return getRoleByName(request, response, next)
        }

        const allRoles = await roleController.getAllRoles();
        response.status(200).json(allRoles);
    } catch (error) {
        next(error)
        //response.status(400).json({ message: error.message })
    }
}


const createRole = async (request, response, next) => {
    const { name, description, permissions } = request.body;

    try {
        const result = await roleController.createRole(name, description, permissions);
        if (!name || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // const newRole = result.save()

        response.status(200).json(result);


    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const addPermissionToRole = async (request, response, next) => {
    const { id } = request.params
    const updates = request.body
    try {
        let result
        if (Object.keys(updates).length == 0) {
            throw new Error('No updates recognized')
        }
        if (updates.permissions) {
            await roleController.addPermissionToRole(id, updates.permissions)
        }
        response.status(200).json({ message: 'The update was succesful' })

    } catch (error) {
        next(error)
    }
}

const getRoleById = async (request, response, next) => {
    const { id } = request.params
    try {
        const result = await roleController.getRoleById(id);
        response.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

const getRoleByName = async (request, response, next) => {
    const { name } = request.query

    try {
        const result = await roleController.getRoleByName(name);
        console.log("this->0", result)
        response.status(200).json(result);
    } catch (error) {
        next(error)
    }
}




module.exports = {
    getAllRoles,
    createRole,
    getRoleById,
    getRoleByName,
    addPermissionToRole
}