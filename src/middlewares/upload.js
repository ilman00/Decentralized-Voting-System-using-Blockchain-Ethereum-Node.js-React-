// lib/multerMiddleware.js
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Factory function to create multer instance with a custom folder
export function getUploadMiddleware(folderName) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folderName)

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

  return multer({ storage })
}

// Middleware wrapper to work with Next.js
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result)
      return resolve(result)
    })
  })
}
