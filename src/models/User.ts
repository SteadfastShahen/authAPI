import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
    name: string; 
    email: string;
    password: string;
    verified: boolean;
    resetLink: String; 
};

interface UserDocument extends IUser {
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
}
  
export const UserSchema = new Schema({
    name: { type:String, required: true },
    email: { type:String, required: true },
    password: { type:String, required: true },
    verified: { type:Boolean, default: false },
    resetLink: { data: String, default: '' }
});
  
const User = model<IUser>('Users', UserSchema, 'Users');


export {
    User,
    UserDocument
};