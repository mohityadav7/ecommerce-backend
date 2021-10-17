/**
 * /routes/user.routes.js
 *
 * @description Main file for all user api routes. All routes with '/api/v1/users'
 * come here.
 */

const userController = require('../controllers/user');
const UserRouter = require('express').Router();

UserRouter.post('/createUser', userController.createUser);
UserRouter.get('/getAllUsers', userController.getAllUsers);
UserRouter.put('/updateUser/:id', userController.updateUser);
UserRouter.delete('/deleteUser/:id', userController.deleteUser);

module.exports = UserRouter;
