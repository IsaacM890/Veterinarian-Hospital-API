/** @format */

import express from 'express';
import config from 'config';
import log from './src/logger';
import connectDB from './config/connectDB';
import patientsRoutes from './src/routes/patientRoutes';
import appoinmentsRoutes from './src/routes/appointmentRoutes';
import authRoutes from './src/routes/authRoute';

export const app = express();

connectDB();

const PORT = config.get('port') as number;
const HOST = config.get('host') as string;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running');
  log.info('API Running');
});
app.get('/health', (req, res) => {
  res.send('Healthy');
  log.info('Healthy');
});

app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appoinmentsRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, HOST, () =>
  log.info(`Server Listening at http://${HOST}:${PORT}`)
);


