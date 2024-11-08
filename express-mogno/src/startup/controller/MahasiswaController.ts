import { Response, Request } from 'express'
import getDb from '../db/mongo'
import { Db, ObjectId } from 'mongodb'
import { Mahasiswa } from '../utils/types'

async function getMahasiswaCollection() {
  const db: Db = await getDb()
  return db.collection("mahasiswa")
}

export const getDataMhs = async (req: Request, res: Response): Promise<any> => {
  try {
    const collection = await getMahasiswaCollection()
    const results = await collection.find({}).toArray()
    return res.status(200).json({
      success: true,
      data: results
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data mahasiswa",
      error: "Internal Server Error"
    })
  }
}

export const getMhsById = async (req: Request, res: Response): Promise<any> => {
  try {
    const collection = await getMahasiswaCollection()
    const id: ObjectId = new ObjectId(req.params.id)
    const result = await collection.findOne({ _id: id })

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan"
      })
    }

    return res.status(200).json({
      success: true,
      data: result
    })

  } catch (err) {
    console.error(`Error: ${err}`)
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data mahasiswa"
    })
  }
}

export const insertMhs = async (req: Request, res: Response): Promise<any> => {
  try {
    const collection = await getMahasiswaCollection();
    const mahasiswa: Mahasiswa = {
      name: req.body.name,
      nim: req.body.nim,
      jurusan: req.body.jurusan,
      angkatan: req.body.angkatan
    }

    const result = await collection.insertOne(mahasiswa);

    return res.status(201).json({
      success: true,
      message: "Data Mahasiswa berhasil ditambahkan",
      data: {
        _id: result.insertedId,
        ...mahasiswa
      }
    })

  } catch (err: any) {
    console.error("Error:", err)
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "NIM already exist"
      })
    }

    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan data",
      error: "Internal Server Error"
    })
  }
}

export const deleteMhs = async (req: Request, res: Response): Promise<any> => {
  try {
    const collection = await getMahasiswaCollection()
    const id: ObjectId = new ObjectId(req.params.id)
    const result = await collection.deleteOne({ _id: id })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Data mahasiswa berhasil dihapus"
    })

  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export const updateMhs = async (req: Request, res: Response): Promise<any> => {
  try {
    const collection = await getMahasiswaCollection()
    const id: ObjectId = new ObjectId(req.params.id)
    const existingDoc = await collection.findOne({ _id: id })

    if (!existingDoc) {
      return res.json({
        success: false,
        message: "Data mahasiswa tidak ditemukan"
      })
    }

    const newData: Mahasiswa = {
      name: req.body.name,
      nim: req.body.nim,
      jurusan: req.body.jurusan,
      angkatan: req.body.angkatan
    }

    const result = await collection.updateOne(
      { _id: id },
      {
        $set: newData
      },
    )

    if (result.modifiedCount === 0) {
      return res.json({
        success: true,
        message: "Tidak ada perubahan data"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Data mahasiswa berhasil di update",
      data: { ...newData }
    })


  } catch (err: any) {
    if (err.code === 11000) {
      return res.json({
        success: false,
        message: "NIM sudah digunakan"
      })
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
} 
