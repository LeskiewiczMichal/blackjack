import { Document, Schema, Model, model, PassportLocalModel } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface UserInterface extends Document {
  username: string;
  email: string;
  balance: number;
  ownedSkins: string[];
  activeSkins: string[];
}

// Create user schema
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  balance: { type: Number, required: true },
  ownedSkins: [{ type: Schema.Types.ObjectId, ref: "Skin" }],
  activeSkins: [{ type: Schema.Types.ObjectId, ref: "Skin" }],
});

// Setting up passport plugin
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User: Model<UserInterface> = model<UserInterface>("User", userSchema);

export { User };
