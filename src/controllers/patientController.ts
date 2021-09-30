/** @format */

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import Patient from '../model/patientModel';
import { serverMessanger } from '../constants/serverMessanger';
import log from '../logger';

const createPatient = async (req: Request, res: Response) => {
  const {
    ownerName,
    ownerPassword,
    ownerEmail,
    ownerPhone,
    petName,
    petType,
    petTypeFood,
    address,
  } = req.body;

  try {
    let patient = await Patient.findOne({ ownerEmail });
    if (patient) {
      log.error('Patient already exists');
      return res
        .status(400)
        .json({ errors: [{ msg: serverMessanger.error.exists }] });
    }

    patient = new Patient({
      ownerName,
      ownerEmail,
      ownerPassword,
      ownerPhone,
      petName,
      petType,
      petTypeFood,
      address,
    });

    const salt = await bcrypt.genSalt(10);

    patient.ownerPassword = await bcrypt.hash(ownerPassword, salt);

    await patient.save();

    const payload = {
      patient: {
        id: patient.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          log.error(err);
          throw err;
        }
        log.info('Patient Created');
        return res.status(201).json({
          msg: serverMessanger.success.create,
          patient: patient,
          accessToken: token,
        });
      }
    );
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

const LoginPatient = async (req: Request, res: Response) => {
  const { ownerEmail, ownerPassword } = req.body;

  try {
    let patient = await Patient.findOne({ ownerEmail });
    if (!patient) {
      log.error('Invalid Credentials');
      return res
        .status(400)
        .json({ errors: [{ msg: serverMessanger.error.invalidCred }] });
    }

    const isMatch = await bcrypt.compare(ownerPassword, patient.ownerPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: serverMessanger.error.invalidCred }] });
    }

    const payload = {
      patient: {
        id: patient.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          log.error(err);
          throw err;
        }
        log.info('Patient logged in');
        return res.status(200).json({
          msg: serverMessanger.success.login,
          patient: patient,
          accessToken: token,
        });
      }
    );
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.find();
    if (!patient) {
      log.error('there is no Paatients stored in DB');
      return res
        .status(404)
        .json({ errors: [{ msg: serverMessanger.error.noExists }] });
    }
    log.info('patients found');
    return res.status(200).json(patient);
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

const updatePatient = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const patient = await Patient.updateOne({ _id: req.params.id }, body);
    if (!patient) {
      log.error('There is not field to update');
      return res
        .status(404)
        .json({ errors: { msg: serverMessanger.error.updateErr } });
    }
    log.info('Patient Updated');
    return res.status(200).json({ msg: serverMessanger.success.update });
  } catch (err: any) {
    log.error(err.message);
    return res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

const deletePatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findOneAndDelete({
      _id: req.params.id,
    });
    if (!patient) {
      log.error('Patient not found');
      return res
        .status(400)
        .json({ msg: serverMessanger.error.noFoundPatient });
    }
    log.info('Patient Deleted');
    return res.json(serverMessanger.success.delete);
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

export {
  createPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
  LoginPatient,
};
