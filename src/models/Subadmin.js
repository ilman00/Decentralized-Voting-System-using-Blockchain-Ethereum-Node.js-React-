import mongoose from 'mongoose'

const SubadminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  district: String,
})

export default mongoose.models.Subadmin || mongoose.model('Subadmin', SubadminSchema)
