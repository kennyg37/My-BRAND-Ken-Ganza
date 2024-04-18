import mongoose, { model } from 'mongoose'

export interface IImage extends Document {
    data: Buffer;
    contentType: string;
}

const imageSchema  = new mongoose.Schema({
    data: Buffer,
    contentType: String
});

export default mongoose.model<IImage>('Image', imageSchema)