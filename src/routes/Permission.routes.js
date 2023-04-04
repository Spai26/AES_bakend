const { Router } = require("express");

const permissionRoute = Router();

const permissionHandler = require("../handlers/Permission/permission.handler")

permissionRoute.get('/', permissionHandler.getAllPermissions)
permissionRoute.post('/', permissionHandler.createPermission)


module.exports = permissionRoute;