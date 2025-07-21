import mongoose from 'mongoose'

const naSchema = new mongoose.Schema({
  naNumber: { type: String, required: true },
  naName: String,
}, { _id: false })

const pkSchema = new mongoose.Schema({
    pkNumber: { type: String, required: true },
    pkName: String,
  }, { _id: false })

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  province: { type: String, required: true },
  NAs: [naSchema], // <-- Embedded NA entries
  PKs: [pkSchema],
})

export default mongoose.models.District || mongoose.model('District', districtSchema)
