import mongoose from "mongoose";

export interface IDetails extends mongoose.Document {
    firstName: string,
    lastName: string,
    phone: string,
    socials: string[],
    image: {
        data: Buffer,
        contentType: string
    }
}
const detailSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    socials: { type: [String] },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    }
},
{
    toJSON: {
        transform: (doc, ret) => {
            return {
                firstName: ret.firstName,
                lastName: ret.lastName,
                phone: ret.phone,
                socials: ret.socials,
                image: {
                    data: ret.image.data,
                    contentType: ret.image.contentType
                }
            };
        }
    }
});

export default mongoose.model<IDetails>('Details', detailSchema);