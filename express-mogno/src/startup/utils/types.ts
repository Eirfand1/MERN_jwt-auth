import { ObjectId } from "mongodb"

export interface Mahasiswa {
   _id?: ObjectId
   name: string
   nim: string
   jurusan?: string
   angkatan?: number
}

export interface RequestWithId extends Request {
  params: {
    id: string
  }
}

export interface userRegisterData {
  name: string,
  email: string,
  password: string
}

// export interface ApiResponse {
//     success: boolean
//     message?: string
//     data?: any
//     error?: string
// }