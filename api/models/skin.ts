import { Document, Schema, Model, model } from "mongoose";

export interface SkinInterface extends Document {
  name: string;
  price: number;
  category: string;
}

// Create user schema
const skinSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

const Skin: Model<SkinInterface> = model<SkinInterface>("Skin", skinSchema);

export { Skin };
