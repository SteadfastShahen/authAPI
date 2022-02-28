import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    name: string; 
    email: string; 
};
  
export const UserSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
});
  
const User = mongoose.model<IUser>('User', UserSchema);
export default User;