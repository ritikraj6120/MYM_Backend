const express = require('express')
const Router = express.Router()
const authUser = require('../middleware/authuser')
const {signUp,signIn,changePassword,userDetails,updateUserDetails} = require('../controller/auth-controller')

Router.post('/signup',signUp)
Router.post('/signin',signIn)

module.exports = Router