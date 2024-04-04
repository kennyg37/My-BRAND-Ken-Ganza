import mongoose from "mongoose";

export const connect = () => {
    mongoose.connect('mongodb://localhost:27017/portfolio',);
}
export interface IUser extends mongoose.Document {
    account: 'admin' | 'guest';
    username: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    account: { type: String, enum:['admin', 'guest'], required: true },
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
},
{ 
    toJSON: {
        transform: (doc, ret) => {
            return {
                account: ret.account,
                username: ret.username,
                email: ret.email,
                password: ret.password,
                id: ret._id
            }
        }
    }
}

);

export default mongoose.model<IUser>('User', UserSchema);