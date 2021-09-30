/** @format */

export const serverMessanger = {
  success: {
    login: 'User logged in',
    create: 'Patient Created',
    createAppointment: 'Appointment Created',
    update: 'Patient Updated',
    delete: 'Patient Deleted',
    deleteAppointment: 'Appointment Deleted',
    updateAppointment: 'Appointment Updated',
    getAllAppointment: 'This are all the Patients stored in DB',
    patientFound: 'Patient Found',
  },
  error: {
    invalidCred: 'Invalid Credentials',
    noExists: 'Patient not exists',
    exists: 'Patient is already exists',
    existsAppointment: 'Appointment is already exists ',
    noAppointment: 'There is no Appointments for this Patient',
    noFoundAppointment: 'Appointment not found',
    noFoundPatient: 'Patient not found',
    serverError: 'Server error',
    updateErr: 'There is not field to update',
  },
};
