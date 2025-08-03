import connectDB from '@/lib/dbConnect'
import Voter from '@/models/Voter'
import { runMiddleware, uploadSinglePicture } from '@/middlewares/upload'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    await connectDB()
    const upload = getUploadMiddleware('voters')
    const uploadSingle = upload.single('picture')

    await runMiddleware(req, res, uploadSingle)

    const {
      name,
      fatherName,
      cnic,
      dob,
      na,
      pk,
      district,
    } = req.body

    if (!req.file) return res.status(400).json({ error: 'Picture is required' })

    const newVoter = new Voter({
      name,
      fatherName,
      cnic,
      dob,
      na,
      pk,
      district,
      picture: `/uploads/voters/${req.file.filename}`,
    })

    await newVoter.save()
    return res.status(200).json({ success: 'Voter added successfully' })
  } catch (err) {
    console.error('Error saving voter:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
