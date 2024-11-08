import express, { Router} from 'express'
import { deleteMhs, getDataMhs, getMhsById, insertMhs, updateMhs } from '../controller/MahasiswaController'

const route: Router = express.Router()

route.get("/",getDataMhs)
route.get("/:id", getMhsById) 
route.post("/", insertMhs)
route.delete("/:id", deleteMhs)
route.put("/:id", updateMhs)

export default route