// const auth = require('./auth')
// const configuration = require('./configuration')
// const registration = require('./registration')
// const practice = require('./practice')
const patient = require('./patient')
// const user = require('./user')

/**
 *
 * @typedef Error
 * @property {string} msg
 */
module.exports = {
  //   '/api/auth': auth,
  //   '/api/configuration': configuration,
  //   '/api/registration': registration,
  //   '/api/practice': practice,
  '/api/patient': patient
  //   '/api/user': user
}
