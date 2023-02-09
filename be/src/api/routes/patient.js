const _ = require('lodash')
const express = require('express')
// Practice
const { Patient } = require('../../model')
// const FileService = require('../FileService')

// const middleware = require('../../middleware')
// const ApiUtils = require('../../utils/ApiUtils')
// const { UserRole: Roles, validApplicationRoles } = require('../../model/Enums')
// const noCache = require('nocache')

const router = express.Router()
// router.use(noCache())
// const patientRecords = require('./patientRecords')

/**
 * @typedef PatientRequest - To be defined
 */

/**
 * @route POST /api/patient
 * @group Patient
 * @param {PatientRequest.model} PatientRequest.body.required - Insert new or update existing patient
 * @security JWT
 */
router.post(
  '/',
  [
    // middleware.auth,
    // middleware.authorize.hasAnyRole(validApplicationRoles),
    // ApiUtils.Validators.notEmptyStringInBody('lastName'),
    // ApiUtils.Validators.notEmptyStringInBody('firstAndMiddleName'),
    // ApiUtils.Validators.notEmptyStringInBody('gender'),
    // ApiUtils.Validators.notEmptyStringInBody('dob')
  ],
  async (req, res) => {
    // if (!ApiUtils.validateRequest(req, res)) return
    try {
      // explicitly deserialize fields which can't be used from request directly or are needed for some BL
      const { _id: id, ...patientData } = req.body
      const { lastName, firstAndMiddleName, archived } = patientData

      console.log('lastName', lastName)
      console.log('firstAndMiddleName', firstAndMiddleName)
      console.log('archived', archived)

      /*
      // resolve practice
      const { user } = middleware.authorize.get(req)
      let practiceId = null
      if (user.mainRole === Roles.ADMIN) {
        if (!middleware.objectIds.isObjectIdValid(req.query.practice)) {
          return ApiUtils.badRequest(req, res, { msg: 'Unable to get practice ID from request' })
        }
        practiceId = req.query.practice
      } else {
        practiceId = user.practice.id
      }

      const practice = await Practice.findById(practiceId)
      if (!practice) {
        return ApiUtils.badRequest(req, res, { msg: `Unable to find practice with ID ${practiceId}` })
      }

      if (middleware.objectIds.isObjectIdValid(id)) {
        const patient = await Patient.findOneAndUpdate({ _id: id, practice: practiceId }, patientData, {
          new: true
        })
        if (!patient) {
          return ApiUtils.badRequest(req, res, { msg: `Unable to find patient with ID ${id}` })
        }
        res.json(patient)
      } else {
        patientData.practice = practiceId
        const duplicatePatient = await Patient.find({
          lastName,
          firstAndMiddleName,
          gender,
          dob,
          practice: practiceId
        })
        if (duplicatePatient.length > 0) {
          return ApiUtils.badRequest(req, res, {
            msg: `Patient ${firstAndMiddleName} ${lastName} with given date of birth and gender is already registered for '${practice.name}'!`
          })
        }
        */
      const patient = new Patient(patientData)
      res.json(await patient.save())
    } catch (err) {
      console.log('err', err)
      return err
      //   return ApiUtils.serverError(req, res, { err })
    }
  }
)

/**
 * @route GET /api/patient
 * @group Patient
 * @security JWT
 */
// [middleware.auth, middleware.authorize.hasAnyRole(validApplicationRoles)],
router.get('/', async (req, res) => {
  try {
    // if (!ApiUtils.validateRequest(req, res)) return
    // resolve practice

    // const { user } = middleware.authorize.get(req)
    // let practiceId = null
    // if (user.mainRole === Roles.ADMIN) {
    //   if (!middleware.objectIds.isObjectIdValid(req.query.practice)) {
    //     return ApiUtils.badRequest(req, res, { msg: 'Unable to get practice ID from request' })
    //   }
    //   practiceId = req.query.practice
    // } else {
    //   practiceId = user.practice.id
    // }
    // const practice = await Practice.findById(practiceId)
    // if (!practice) {
    //   return ApiUtils.badRequest(req, res, { msg: `Unable to find practice with ID ${practiceId}` })
    // }

    // res.json(await Patient.find({ practice: practiceId }))
    res.json(await Patient.find())
  } catch (err) {
    return ApiUtils.serverError(req, res, { err })
  }
})

/**
 * @route GET /api/patient/{patientId}
 * @group Patient
 * @param {string} patientId.path - Patient ID
 * @param {string} practice.query - Practice id reference which must be provided by admin users. For other users this param is ignored and practice is resolved automatically.
 * @security JWT
 */
router.get(
  '/:patientId',
  //   [
  //     middleware.auth,
  //     middleware.authorize.hasAnyRole(validApplicationRoles),
  //     middleware.objectIds.checkPathParamObjectId('patientId', { msg: 'Invalid patient ID' })
  //   ],
  async (req, res) => {
    try {
      //   if (!ApiUtils.validateRequest(req, res)) return

      //   const { patientId } = req.params
      //   const { user } = middleware.authorize.get(req)
      //   let practiceId = null
      //   if (user.mainRole === Roles.ADMIN) {
      //     if (!middleware.objectIds.isObjectIdValid(req.query.practice)) {
      //       return ApiUtils.badRequest(req, res, { msg: 'Unable to get practice ID from request' })
      //     }
      //     practiceId = req.query.practice
      //   } else {
      //     practiceId = user.practice.id
      //   }

      //   const patient = await Patient.findById(patientId)
      //   if (!patient || patient.practice.toString() !== practiceId) {
      //     return ApiUtils.badRequest(req, res, { msg: 'Unable to find patient' })
      //   }
      res.json(patient)
    } catch (err) {
      return ApiUtils.serverError(req, res, { err })
    }
  }
)

// router.post(
//   '/:patientId/upload',
//   [
//     middleware.auth,
//     middleware.authorize.hasAnyRole(validApplicationRoles),
//     middleware.objectIds.checkPathParamObjectId('patientId', { msg: 'Invalid patient ID' })
//   ],
//   (req, res) => {
//     if (!ApiUtils.validateRequest(req, res)) return

//     const sendErrorResponse = (error) => {
//       const messages = ['File upload failed']
//       if (error && error.message) {
//         messages.push(error.message)
//       }
//       ApiUtils.badRequest(req, res, _.join(messages, ': '))
//     }

//     try {
//       const { patientId } = req.params
//       const { user } = middleware.authorize.get(req)

//       const uploadFilePromise = new Promise((resolve, reject) => {
//         // will upload file for further processing into uploadDir/practiceId/patientId/staging
//         req.busboy.on(
//           'file',
//           FileService.uploadPatientFileUploader(
//             user.practice.id,
//             patientId,
//             (fileUploadDetails) => {
//               resolve(fileUploadDetails)
//             },
//             (error) => {
//               sendErrorResponse(error)
//               reject(error)
//             }
//           )
//         )
//       })

//       const uploadFileDataPromise = new Promise((resolve, reject) => {
//         let fulfilled = false

//         // will resolve data field sent with file upload required for further processing
//         req.busboy.on('field', (key, value) => {
//           if (key !== 'data') {
//             console.warn(`Unexpected data field in patient upload data, ${key} = ${value}`)
//             return
//           }
//           try {
//             fulfilled = true
//             resolve(JSON.parse(value))
//           } catch (error) {
//             sendErrorResponse(error)
//             reject(error)
//           }
//         })

//         req.busboy.on('finish', function () {
//           // secret backdoor causing unfinished upload failure after timeout when request is completely parsed
//           if (fulfilled === false) {
//             const error = new Error('Unexpected failure in file upload caused by missing upload data object')
//             sendErrorResponse(error)
//             reject(error)
//           }
//         })
//       })

//       Promise.all([uploadFilePromise, uploadFileDataPromise])
//         .then((values) => {
//           const fileUploadDetails = values[0]
//           const fileUploadData = values[1]
//           return FileService.finishPatientFileUpload(user, patientId, fileUploadDetails, fileUploadData)
//         })
//         .then((response) => res.json(response))
//         .catch((error) => {
//           const msg = error && error.message ? error.message : 'File upload failed unexpectedly'
//           console.log(msg, error)
//         })

//       // starts request processing
//       req.pipe(req.busboy)
//     } catch (err) {
//       return ApiUtils.serverError(req, res, { err })
//     }
//   }
// )

// patientRecords(router)
module.exports = router
