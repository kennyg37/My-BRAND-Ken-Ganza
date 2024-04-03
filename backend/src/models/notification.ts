import mongoose from "mongoose";

export interface INoti extends mongoose.Document {
    title: string;
    message: string;
    date: Date;
    open: boolean;
    timestamp: Date;
}

const notiSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
    open: { type: Boolean, default: false},
    timestamp: { type: Date, default: Date.now },
},
{
    toJSON: {
        transform: (doc, ret) => {
            return {
                title: ret.title,
                message: ret.message,
                date: ret.date,
                open: ret.open,
                timestamp: ret.timestamp,
                id: ret._id,
            }
        }
    }
}
);

export default mongoose.model<INoti>('Notification', notiSchema);