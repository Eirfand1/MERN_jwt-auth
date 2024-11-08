import express, {Router } from 'express'
import RegisterController  from '../controller/RegisterController'
import { validateLogin, validateRegister } from '../utils/validator/auth'
import LoginController from '../controller/LoginController'

const route: Router = express.Router()

route.post("/register", validateRegister, RegisterController) 
route.post("/login", validateLogin, LoginController)

export default route
