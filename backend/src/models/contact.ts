import mongoose from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    message: string;
}

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
},
{
    toJSON: {
        transform: (doc, ret) => {
            return {
                name: ret.name,
                email: ret.email,
                message: ret.message,
                id: ret._id,
            }
        }
    }
}
);

const Contact = mongoose.model<IContact>('Contact', contactSchema);
export default Contact