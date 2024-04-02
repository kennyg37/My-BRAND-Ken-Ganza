import mongoose from "mongoose";

export interface IDetails extends Document{
    firstName: string,
    lastName: string,
    phone: string,
    socials: string[]
}

const detailSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: {type: String},
    phone: {type: String},
    socials: {type: [String]}
},
{
    toJSON: {
        transform: (doc, ret) => {
            return {
                firstName: ret.firstName,
                lastName: ret.lastName,
                phone: ret.phone,
                socials: ret.socials
            }
        }
    }
}
);

export default mongoose.model<IDetails>('Details', detailSchema);