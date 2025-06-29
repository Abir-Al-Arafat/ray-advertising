import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description?: string;
}
