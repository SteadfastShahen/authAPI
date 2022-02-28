import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string; 
    email: string; 
};
  
export const UserSchema = new mongoose.Schema({
name: {type:String, required: true},
somethingElse: Number,
});
  
const User = mongoose.model<IUser>('User', UserSchema);
export default User;