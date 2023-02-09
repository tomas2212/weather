const mongoose = require('mongoose')
// Gender, MaritalStatus
const { Collections } = require('./Enums')

const PatientSchema = new mongoose.Schema({
  // practice: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: Collections.practices
  // },
  lastName: {
    type: String,
    required: true
  },
  firstAndMiddleName: {
    type: String,
    required: true
  },
  // preferredName: {
  //     type: String
  // },
  email: {
    type: String
  },
  archived: {
    type: Boolean,
    default: false,
    required: true
  }
  // dob: {
  //     type: Date,
  //     required: true
  // },
  // gender: {
  //     type: String,
  //     required: true,
  //     enum: Object.keys(Gender).map((roleKey) => Gender[roleKey])
  // },
  // address: {
  //     type: String
  // },
  // city: {
  //     type: String
  // },
  // state: {
  //     type: String
  // },
  // zip: {
  //     type: String
  // },
  // phoneHome: {
  //     type: String
  // },
  // cellPhone: {
  //     type: String
  // },

  // maritalStatus: {
  //     type: String,
  //     enum: ['', ...Object.keys(MaritalStatus).map((roleKey) => MaritalStatus[roleKey])]
  // },
  // partnerName: {
  //     type: String
  // },
  // emergencyContact: {
  //     type: String
  // },
  // emergencyContactRelation: {
  //     type: String
  // },
  // emergencyContactPhoneHome: {
  //     type: String
  // },
  // emergencyContactCellPhone: {
  //     type: String
  // },
  // patientMD: {
  //     type: String
  // },
  // patientMDPhone: {
  //     type: String
  // },
})

module.exports = Patient = mongoose.model(Collections.patients, PatientSchema)
