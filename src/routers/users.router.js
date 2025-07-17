const path = require('node:path')
const usersRouter = require('express').Router()
const multer = require('multer')
const { v4: uuid } = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('uploads', 'profile-picture'))
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    const ext = filename.split('.')[1]
    const savedFile = `${uuid()}.${ext}`
    cb(null, savedFile)
  }
})
const usersController = require('../controllers/users.controller')
const profilePicture = multer({ storage })


usersRouter.get('/', usersController.getAllUsers)
usersRouter.get('/:id', usersController.getUserById)
usersRouter.post('/', profilePicture.single('picture'), usersController.createUser) 
usersRouter.patch('/:id', usersController.updateUser)
usersRouter.delete('/:id', usersController.deleteUser)

module.exports = usersRouter