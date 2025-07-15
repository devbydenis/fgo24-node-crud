const usersRouter = require('express').Router()
const usersController = require('../controllers/users.controller')

usersRouter.get('/', usersController.getAllUsers)
usersRouter.get('/:id', usersController.getUserById)
usersRouter.post('/', usersController.createUser) 
usersRouter.patch('/:id', usersController.updateUser)
usersRouter.delete('/:id', usersController.deleteUser)

module.exports = usersRouter