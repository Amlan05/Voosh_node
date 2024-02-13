
const express = require('express')
const userRouter  =express.Router()
const userController = require('../Controller/UserController')

userRouter
.post("/add-user", userController.userRegister)
.post('/login-user', userController.loginUser)
exports.userRouter = userRouter 