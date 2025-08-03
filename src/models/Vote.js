// models/Vote.js
import mongoose from 'mongoose'

const voteSchema = new mongoose.Schema(
  {
    voterCnic: {
      type: String,
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    constituency: {
      type: String,
      required: true,
    },
    voteType: {
      type: String,
      enum: ['NA', 'PK'],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    storedOnBlockchain: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Vote || mongoose.model('Vote', voteSchema)
