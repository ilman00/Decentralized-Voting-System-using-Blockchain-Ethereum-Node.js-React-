import mongoose from 'mongoose'

const CandidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String },
    cnic: {type: String, required: true},

    district: { type: String, required: true },
    seat: {type: String, required: true},
    pkOrNa: { type: String },
    party: { type: String },
    imageUrl: { type: String },
    voteCount: Number,
    blockchainAddress: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.Candidate || mongoose.model('Candidate', CandidateSchema)
