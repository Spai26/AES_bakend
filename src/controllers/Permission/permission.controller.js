const Permission = require('../../database/Permission.model')

const getAllPermissions = async () => {
    return await Permission.find({}).populate({ path: 'roles', select: '-permissions' })
}

const createPermission = async (name, description) => {
    console.log(name, description)
    const existenPermission = await Permission.findOne({ name: name })
    if (existenPermission) {
        throw new Error(`The ${name} permission already exists`)
    }

    const newPermission = Permission({
        name,
        description
    })

    return newPermission.save()
}





module.exports = {
    getAllPermissions,
    createPermission,
}