import mongoose, {Document, Schema, connect} from "mongoose";

export interface IBlog extends Document {
    title: string;
    subtitle: string;
    content: string;
    likes: number;
    comments: string[];
    commentsCount: number;
}

const blogSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: [String], default: [] },
    commentsCount: { type: Number, default: 0 },
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
                id: ret._id,
            }
        }
    }
}

);

export default mongoose.model<IBlog>('Blog', blogSchema);