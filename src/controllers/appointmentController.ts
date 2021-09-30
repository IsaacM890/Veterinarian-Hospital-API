/** @format */

import { Request, Response } from 'express';
import Appointment from '../model/appiontmentModel';
import { serverMessanger } from '../constants/serverMessanger';
import log from '../logger';
import { getCurrencyAPI } from '../api/axios';

const createAppointment = async (req: Request, res: Response) => {
  const { startTime, endTime, description, fee, paid, patientId } = req.body;

  try {
    let appointment = await Appointment.findOne({ _id: req.params.id });
    if (appointment) {
      log.error('Appointment already exists');
      return res
        .status(400)
        .json({ errors: [{ msg: serverMessanger.error.exists }] });
    }

    let feeByCurrency = await getCurrencyAPI(fee);

    appointment = new Appointment({
      startTime,
      endTime,
      description,
      fee: feeByCurrency,
      paid,
      patientId,
    });

    await appointment.save();

    log.info('Appointment Created');
    return res.json({
      msg: serverMessanger.success.createAppointment,
      appointment,
    });
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.find();
    if (!appointment) {
      log.error('there is no appointment stored in DB');
      return res
        .status(404)
        .json({ errors: [{ msg: serverMessanger.error.noExists }] });
    }
    log.info('appointments found');
    return res.status(200).json(appointment);
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

const updateAppointment = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const appointment = await Appointment.updateOne(
      { _id: req.params.id },
      body
    );
    if (!appointment) {
      log.error('There is not field to update');
      return res
        .status(400)
        .json({ errors: { msg: serverMessanger.error.updateErr } });
    }
    log.info('Appointment Updated');
    return res.status(200).json({ msg: serverMessanger.success.update, body });
  } catch (err: any) {
    log.error(err.message);
    return res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
    });
    if (!appointment) {
      log.error('Appointment not found');
      return res
        .status(400)
        .json({ msg: serverMessanger.error.noFoundAppointment });
    }
    log.info('Appointment Deleted');
    return res.json(serverMessanger.success.deleteAppointment);
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

const getAppointmentsByPatientId = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId,
    }).populate('patientId', [
      'ownerName',
      'ownerEmail',
      'ownerPhone',
      'petName',
      'petType',
      'petTypeFood',
      'address',
    ]);

    if (!appointments) {
      return res
        .status(400)
        .json({ msg: 'There is no appointments for this patient' });
    }
    res.json(appointments);
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

export {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatientId,
};
