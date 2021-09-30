/** @format */

import { app } from '../server';
import request from 'supertest';
import faker from 'faker';

describe('POST /patients/create', () => {
  describe('given all required data', () => {
    test('should respond with 201 status code', async () => {
      const response = await request(app)
        .post('/api/patients/create')
        .send({
          petName: 'petName',
          petType: 'petType',
          petTypeFood: 'petTypeFood',
          ownerName: `${faker.name.lastName()} ${faker.name.firstName()}`,
          ownerEmail: faker.internet.email(),
          ownerPassword: 'ownerPassword',
          ownerPhone: 2125552222,
          address: {
            city: 'city',
            street: 'street',
          },
        });
      expect(response.statusCode).toBe(201);
    });

    test('should respond with 400 status code', async () => {
      const response = await request(app)
        .post('/api/patients/create')
        .send({
          petName: 'p',
          petType: 'petType',
          petTypeFood: 'petTypeFood',
          ownerName: `${faker.name.lastName()} ${faker.name.firstName()}`,
          ownerEmail: faker.internet.email(),
          ownerPassword: 'ownerPassword',
          ownerPhone: '2125552222',
          address: {
            city: 'city',
            street: 'street',
          },
        });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('GET /patients/all', () => {
  describe('get all patients data', () => {
    test('should respond with 401 status code no token', async () => {
      const response = await request(app).get('/api/patients/all');
      expect(response.statusCode).toBe(401);
    });
  });
});

describe('PUT /patients/edit/:id', () => {
  describe('given all required data', () => {
    test('should respond with 401 status code', async () => {
      const response = await request(app)
        .put('/api/patients/edit/:id')
        .send({
          petName: '',
          petType: '',
          petTypeFood: 'petTypeFood',
          ownerName: `${faker.name.lastName()} ${faker.name.firstName()}`,
          ownerEmail: faker.internet.email(),
          ownerPassword: 'ownerPassword',
          ownerPhone: 2120,
          address: {
            city: 'city',
            street: 'street',
          },
        });
      expect(response.statusCode).toBe(401);
    });

    test('should respond with 404 status code', async () => {
      const response = await request(app)
        .post('/api/patients/edit/:id')
        .send({
          petName: 'petName',
          petType: 'petType',
          petTypeFood: 'petTypeFood',
          ownerName: `${faker.name.lastName()} ${faker.name.firstName()}`,
          ownerEmail: faker.internet.email(),
          ownerPassword: 'ownerPassword',
          ownerPhone: 2125552222,
          address: {
            city: 'city',
            street: 'street',
          },
        });
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('DELETE /Patients/:id', () => {
  describe('should failed delete patient , id not provided', () => {
    test('should respond with 401 status code id privided', async () => {
      const response = await request(app).delete('/api/Patients/:id');
      expect(response.statusCode).toBe(401);
    });
  });
});

describe('POST /appointments/create', () => {
  describe('given all required data', () => {
    test('should respond with 401 status code', async () => {
      const response = await request(app)
        .post('/api/appointments/create')
        .send({
          startTime: '06:00',
          endTime: '07:00',
          description: 'meeting',
          fee: 70,
          paid: false,
        });
      expect(response.statusCode).toBe(401);
    });

    test('should respond with 401 status code', async () => {
      const response = await request(app)
        .post('/api/appointments/create')
        .send({
          startTime: '06:00',
          endTime: '07:00',
          description: '',
          fee: 70,
          paid: false,
        });
      expect(response.statusCode).toBe(401);
    });
  });
});

describe('GET /appointments/patient/:patientId', () => {
  describe('get all patients data', () => {
    test('should respond with 404 status code ,not found - no Id provided', async () => {
      const response = await request(app).get(
        '/appointment/patient/:patientId'
      );
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('PUT /appointments/edit/:id', () => {
  describe('given all required data', () => {
    test('should respond with 401 status code', async () => {
      const response = await request(app)
        .put('/api/appointments/edit/:id')
        .send({
          startTime: '06:00',
          endTime: '07:00',
          description: 'meeting',
          fee: 70,
          paid: false,
        });
      expect(response.statusCode).toBe(401);
    });

    test('should respond with 401 status code', async () => {
      const response = await request(app)
        .put('/api/appointments/edit/:id')
        .send({
          startTime: '',
          endTime: '07:00',
          description: 'meeting',
          fee: 70,
          paid: false,
        });
      expect(response.statusCode).toBe(401);
    });
  });
});

describe('DELETE /appointments/:id', () => {
  describe('should failed delete appointment , id not provided', () => {
    test('should respond with 401 status code id privided', async () => {
      const response = await request(app).delete('/api/appointments/:id');
      expect(response.statusCode).toBe(401);
    });
  });
});
