import mongoose, {Document, Schema, connect} from "mongoose";

export interface IBlog extends Document {
    title: string;
    subtitle: string;
    content: string;
    likes: number;
    comments: string[];
    commentsCount: number;
    image: {
        data: Buffer;
        contentType: string;
    };
}

const blogSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: [String], default: [] },
    commentsCount: { type: Number, default: 0 },
    image: {
        data: Buffer,
        contentType: String
    }
},
{
    toJSON: {
        transform: (doc, ret) => {
            return {
                title: ret.title,
                subtitle: ret.subtitle,
                content: ret.content,
                likes: ret.likes,
                comments: ret.comments,
                commentsCount: ret.commentsCount,
                image: ret.image ? {
                    data: ret.image.data ? ret.image.data.toString('base64') : null,
                    contentType: ret.image.contentType
                } : null,                
                id: ret._id,
            }
        }
    }
}

);

export default mongoose.model<IBlog>('Blog', blogSchema);