/** @format */

import mongoose from 'mongoose';

export interface PatientDocument extends mongoose.Document {
  petName: string;
  petType: string;
  petTypeFood: string;
  ownerName: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerPhone: number;
  address: {
    city: { type: string };
    street: { type: string };
  };
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    petType: { type: String, required: true },
    petTypeFood: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true, unique: true },
    ownerPassword: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      street: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model<PatientDocument>('Patient', PatientSchema);

export default Patient;
