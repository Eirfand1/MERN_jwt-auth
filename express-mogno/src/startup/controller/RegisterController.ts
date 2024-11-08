import { Request, Response } from "express"
import { validationResult, Result, ValidationError } from "express-validator"
import bcrypt from "bcryptjs"
import getDb from "../db/mongo"
import { Collection, Db } from "mongodb"
import { userRegisterData } from "../utils/types"

const RegisterController = async (req: Request, res: Response): Promise<any>=> {
   const db: Db = getDb()
   const collection: Collection =  db.collection("users")
   const errors: Result<ValidationError> = validationResult(req)
   
   if(!errors.isEmpty()){
      return res.status(422).json({
         success: false,
         message: "Validation Error",
         errors: errors.array()
      })
   }
   
   const hashedPassword: string = await bcrypt.hash(req.body.password,10)
   
   try{
      const data: userRegisterData = {
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword
      }

      await collection.insertOne(data)
      
      return res.status(201).json({
         success: true,
         message: "Register succesfull",
         data: {...data} 
      })

   }catch(err: any){
      if(err.code === 11000) {
         return res.status(400).json({
            success: false,
            message: "Email already exist"
         })
      }

      return res.status(500).send({
         success: false,
         message: "Internal server error",
      });
   }
}

export default RegisterController 
