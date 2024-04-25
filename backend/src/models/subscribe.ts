import mongoose from "mongoose";

export interface ISubscribe extends mongoose.Document {
    email: string;
    subscribedAt: Date;
    subscribed: boolean;
}

const SubscribeSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    subscribedAt: { type: Date, default: Date.now },
    subscribed: { type: Boolean, default: false },
},
{
    toJSON: {
        transform: (doc, ret) => {
            return {
                email: ret.email,
                subscribedAt: ret.subscribedAt,
                subscribed: ret.subscribed,
                id: ret._id,
            }
        }
   }
});

export default mongoose.model<ISubscribe>("Sub", SubscribeSchema);