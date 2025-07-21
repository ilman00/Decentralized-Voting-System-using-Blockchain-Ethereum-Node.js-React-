const mongoose = require('mongoose')

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{13}$/,
  },
  dob: {
    type: Date,
    required: true,
  },
  na: {
    type: String,
    required: true,
  },
  pk: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  voted: {
    na: { type: Boolean, default: false },
    pk: { type: Boolean, default: false }
  }
}, { timestamps: true })

module.exports = mongoose.models.Voter || mongoose.model('Voter', voterSchema)
