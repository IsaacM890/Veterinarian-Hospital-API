/** @format */

import mongoose, { Schema } from 'mongoose';

export interface AppoinmentDocument extends mongoose.Document {
  startTime: string;
  endTime: string;
  description: string;
  fee: number;
  paid: boolean;
  patientId: string;
}

const AppoinmentSchema = new mongoose.Schema(
  {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    description: { type: String, required: true },
    fee: {
      CAD: { type: Number, required: true },
      USD: { type: Number, required: true },
      EUR: { type: Number, required: true },
    },
    paid: { type: Boolean, required: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
  },
  { timestamps: true }
);

const Appoinment = mongoose.model<AppoinmentDocument>(
  'Appoinment',
  AppoinmentSchema
);

export default Appoinment;
