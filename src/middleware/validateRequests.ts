/** @format */

import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { getRequireText, getLengthText, getValidText } from '../utils/index';

export function validateRequestsSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const patientValidation = [
  body('petName')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getRequireText('Pet name')),
  body('petName')
    .isLength({ min: 2 })
    .withMessage(getLengthText('Pet name', '2')),
  body('petType')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getRequireText('Pet type')),
  body('petTypeFood')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getRequireText('Pet type food')),
  body('ownerEmail')
    .exists({ checkFalsy: true, checkNull: true })
    .isEmail()
    .normalizeEmail()
    .withMessage(getValidText('Email')),
  body('ownerPassword')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getRequireText('ownerPassword')),
  body('ownerPassword')
    .isLength({ min: 6 })
    .withMessage(getLengthText('ownerPassword', '6')),
  body('ownerPhone')
    .exists({ checkFalsy: true, checkNull: true })
    .isLength({ min: 8 })
    .withMessage(getLengthText('Phone', '8')),
  body('address.city')
    .isLength({ min: 2 })
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getLengthText('City', '2')),
  body('address.street')
    .isLength({ min: 2 })
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getLengthText('Street', '2')),
];

const loginValidation = [
  body('ownerEmail')
    .exists({ checkFalsy: true, checkNull: true })
    .isEmail()
    .normalizeEmail()
    .withMessage(getValidText('Email')),
  body('ownerPassword')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getRequireText('ownerPassword')),
  body('ownerPassword')
    .isLength({ min: 6 })
    .withMessage(getLengthText('ownerPassword', '6')),
];

const appointmentValidation = [
  body('startTime')
    .isLength({ min: 2 })
    .withMessage(getLengthText('End time', '2')),
  body('startTime')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getRequireText('Start time')),
  body('endTime')
    .isLength({ min: 2 })
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getLengthText('End time', '2')),
  body('description')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getRequireText('description')),
  body('fee')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(getRequireText('fee')),
  body('paid').exists({ checkFalsy: true, checkNull: true }).isBoolean(),
];

export { patientValidation, appointmentValidation, loginValidation };
