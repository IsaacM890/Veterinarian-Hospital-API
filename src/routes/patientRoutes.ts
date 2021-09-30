/** @format */

import express from 'express';
import {
  createPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
} from '../controllers/patientController';
import { auth } from '../middleware/auth';
import {
  patientValidation,
  validateRequestsSchema,
} from '../middleware/validateRequests';

const router = express.Router();

router.post(
  '/create',
  patientValidation,
  validateRequestsSchema,
  createPatient
);

router.get('/all', auth, getAllPatients);

router.put(
  '/edit/:id',
  auth,
  patientValidation,
  validateRequestsSchema,
  updatePatient
);

router.delete('/:id', auth, deletePatient);

export default router;
