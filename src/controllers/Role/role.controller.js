const Role = require('../../database/Role.model')
const Permission = require('../../database/Permission.model')

const getAllRoles = async () => {
    return await Role.find().populate({ path: 'permissions', select: '-roles' });
}

const createRole = async (name, description, permissionNames) => {

    const existentRole = await Role.findOne({ name: name })
    if (existentRole) {
        throw new Error(`The ${name} role already exists`)
    }
    const permissionFilters = await Permission.find({ name: { $in: permissionNames } })
    const newRole = Role({
        name,
        description,
        permissions: permissionFilters.map(permission => permission._id)
    })

    await Permission.updateMany({ name: { $in: permissionNames } }, { $push: { roles: newRole } })

    return newRole.save()
}

const addPermissionToRole = async (id, permissionNames) => {
    try {
        const role = await getRoleById(id)
        const permissionFilters = await Permission.find({ name: { $in: permissionNames } }, '_id')
        role.permissions = role.permissions.concat(permissionFilters)
        await Permission.updateMany({ name: { $in: permissionNames } }, { $push: { roles: role } })

        return role.save()
    } catch (error) {
        throw error
    }

}

const getRoleById = async (id) => {

    try {
        const result = await Role.findById({ _id: id })
        if (!result) {
            throw new Error(`Role's id: ${id} not found`)
        }
        return result.populate({ path: 'permissions', select: '-roles' })

    } catch (error) {
        throw error
    }


}

const getRoleByName = async (name) => {
    try {
        const result = await Role.findOne({ name: name })

        if (!result) {
            throw new Error(`Role ${name}: not found`)
        }
        return result.populate({ path: 'permissions', select: '-roles' })

    } catch (error) {
        throw error
    }
}

module.exports = {
    createRole,
    getRoleById,
    getRoleByName,
    getAllRoles,
    addPermissionToRole
}