import {Request, Response} from "express"
import { Result, ValidationError, validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDb from "../db/mongo"
import { Collection, Db, WithId } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const LoginController = async (req: Request, res: Response): Promise<any>=>{
   const errors: Result<ValidationError> = validationResult(req)
   const db: Db = getDb()
   const collection: Collection = db.collection("users")

   if(!errors.isEmpty()){
      return res.status(422).json({
         success: false,
         message: "Validatoin Error",
         errors: errors.array()
      })
   }

   try{
      const user: WithId<any> = await collection.findOne({email: req.body.email})
      
      if(!user){
         return res.status(404).json({
            success: false,
            message: "User not found"
         })
      }

      const validPassword = await bcrypt.compare(
         req.body.password,
         user.password
      )

      if (!validPassword)
         return res.status(401).json({
            success: false,
            message: "Invalid password",
      });

      const token: string = jwt.sign({ _id : user._id}, process.env.JWT_SECRET!, {
         expiresIn: "1h"
      })

      // destruct untuk menghilangkan password
      const { password, ...userWithoutPassword} = user;

      res.status(200).json({
         success: true,
         message: "Login Succesfull",
         data: {
            user: userWithoutPassword,
            token: token
         }
      })

   }catch(err){
      res.status(500).send({
         success: false,
         message: "Internal server error",
      });
   }
}

export default LoginController
   