import { getUploadMiddleware, runMiddleware } from '@/middlewares/upload'
import connectDB from '@/lib/dbConnect'
import Candidate from '@/models/Condidate' // Make sure filename is spelled 'Candidate.js'
// import { addCandidateToBlockchain } from '@/lib/blockchain'

export const config = {
  api: {
    bodyParser: false, // Required for multer
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }

  try {
    // ⏬ Save to public/uploads/candidates
    const upload = getUploadMiddleware('candidates')
    const uploadSingle = upload.single('symbolImage') // 🔑 Match input name from form

    await runMiddleware(req, res, uploadSingle)
    await connectDB()

    const {
      name,
      fatherName,
      cnic,
      seat,
      district,
      type,
      partyName,
      symbolName,
      pkOrNa,
    } = req.body

    if (!name || !district || !pkOrNa || !partyName) {
      return res.status(400).json({ error: 'Required fields are missing' })
    }

    const imageUrl = `/uploads/candidates/${req.file?.filename}`;

    const candidate = await Candidate.create({
      name,
      fatherName,
      cnic,
      seat,
      district,
      pkOrNa,
      party: partyName,
      imageUrl,
    })

    // await addCandidateToBlockchain({
    //   name,
    //   voteType: type,
    // })

    return res.status(200).json({ message: 'Candidate added successfully', candidate })
  } catch (err) {
    console.error('❌ Error adding candidate:', err)
    return res.status(500).json({ error: 'Failed to add candidate' })
  }
}
