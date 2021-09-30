/** @format */

import express from 'express';
import { auth } from '../middleware/auth';
import { authTest } from '../controllers/authController';
import { LoginPatient } from '../controllers/patientController';

const router = express.Router();

router.get('/test', auth, authTest);

router.post('/login', LoginPatient);
export default router;
