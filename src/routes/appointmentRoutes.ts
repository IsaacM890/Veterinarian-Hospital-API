/** @format */

import express from 'express';
import {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatientId,
} from '../controllers/appointmentController';
import {
  appointmentValidation,
  validateRequestsSchema,
} from '../middleware/validateRequests';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post(
  '/create',
  auth,
  appointmentValidation,
  validateRequestsSchema,
  createAppointment
);

router.get('/patient/:patientId', auth, getAppointmentsByPatientId);

router.get('/all', auth, getAllAppointments);

router.put(
  '/edit/:id',
  auth,
  appointmentValidation,
  validateRequestsSchema,
  updateAppointment
);

router.delete('/:id', auth, deleteAppointment);

export default router;
