import { Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

interface CustomJwtPayload extends JwtPayload {
  id: string | number
}

const verifyToken = (req: any, res: Response, next: NextFunction): any => {
  try {
    const token = req.headers['authorization']
    if (!token) {
      throw new Error('No token provided')
    }

    const jwtSecret = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload

    req.userId = decoded.id
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message === 'No token provided'
        ? 'Unauthenticated.'
        : 'Invalid token'
    })
  }
}

export default verifyToken
