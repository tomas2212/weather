// const { flatObjectValues } = require('../utils/ObjectUtils')

// const UserRole = {
//     ADMIN: 'admin',
//     DOCTOR: 'doctor',
//     FRONT_DESK: 'frontdesk',
//     ANONYMOUS: 'anonymous'
// }

// const AppointmentType = {
//     visit: 'visit',
//     reserved: 'reserved',
//     vacation: 'vacation',
//     walkIn: 'walkIn'
// }

// const PatientRecordType = {
//     /** Doctor visit */
//     visit: 'visit',
//     /** Record made by receptionist or anyone else without actual visit of the doctor */
//     intake: 'intake'
// }

module.exports = {
  Collections: {
    users: 'users',
    registrations: 'registrations',
    patients: 'patients',
    patientRecords: 'patient_records',
    practices: 'practices',
    calendarEvents: 'calendar_events'
  }
  // UserRole,
  // validApplicationRoles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.FRONT_DESK],
  // UserRegistrationStatus: {
  //     PENDING: 'pending',
  //     ACCEPTED: 'accepted',
  //     REJECTED: 'rejected'
  // },
  // DoctorType: {
  //     DC: 'DC'
  // },
  // Gender: {
  //     male: 'male',
  //     female: 'female'
  // },
  // MaritalStatus: {
  //     single: 'single',
  //     married: 'married',
  //     divorced: 'divorced'
  // },
  // PatientRecordType,
  // validPatientRecordTypes: flatObjectValues(PatientRecordType),
  // VisitStatus: {
  //     walkIn: 'walkedIn',
  //     scheduled: 'scheduled',
  //     canceled: 'canceled',
  //     started: 'started',
  //     closed: 'closed'
  // },
  // AppointmentType,
  // validAppointmentTypes: flatObjectValues(AppointmentType)
}
