const { Router } = require("express");

const roleRoute = Router();

const roleHandler = require("../handlers/Roles/role.handler")

roleRoute.get('/', roleHandler.getAllRoles)
roleRoute.get('/:id', roleHandler.getRoleById)
roleRoute.put('/:id', roleHandler.addPermissionToRole)
roleRoute.post('/', roleHandler.createRole)


module.exports = roleRoute;