import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
    name: string; 
    email: string;
    password: string; 
};
  
export const UserSchema = new Schema({
    name: { type:String, required: true },
    email: { type:String, required: true },
    password: { type:String, required: true },
});
  
const User = model<IUser>('User', UserSchema);
export {
    User,
};