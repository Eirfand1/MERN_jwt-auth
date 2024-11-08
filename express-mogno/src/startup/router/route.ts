import { Express, Request, Response } from "express";
import mahasiswaRoute from './mahasiswaRoute'
import userRoute from './userRoute'
import verifyToken from "../middlewares/auth";

const routerSetup = (app: Express, express: any)=> {
   app.get("/", async (req: Request, res: Response)=> {
      res.status(200).json({
         success: true,
         message: "yoo" 
      });
   })
   
   app.use("/api/mahasiswa", verifyToken, mahasiswaRoute)
   app.use("/api/user", userRoute)
}

export default routerSetup