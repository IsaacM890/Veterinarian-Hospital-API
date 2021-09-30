/** @format */

import { Request, Response } from 'express';
import Patient from '../model/patientModel';
import log from '../logger/index';
import { serverMessanger } from '../constants/serverMessanger';

const authTest = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const patient = await Patient.findById(req.patient.id).select(
      '-ownerPassword'
    );
    res.json(patient);
  } catch (err: any) {
    log.error(err.message);
    res
      .status(500)
      .json({ errors: { msg: serverMessanger.error.serverError } });
  }
};

export { authTest };
