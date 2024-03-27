import express, { Request, Response } from 'express';
import Blog from '../models/blog';
import verifyToken from '../middleware/authBlog';

const router = express.Router();

router.get('/data', async (req: Request, res: Response) => {
    const info = await Blog.find();
    res.send(info);
});

router.post('/create', verifyToken, async (req: Request, res: Response) => {
    const {title, subtitle, content} = req.body;
    const info = new Blog ({
        title,
        subtitle,
        content,
    })
    await info.save();
    res.json({message: 'Blog created successfully'})
});

router.put('/like/:id', verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$inc: {likes: 1}}, {new: true});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog liked successfully'})
    }
});

router.put('/comment/:id', verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const {comment} = req.body;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$push: {comments: comment}, $inc: {commentsCount: 1}}, {new: true});

    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Comment added successfully'})
    }
});

router.put('/update/:id', verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title, subtitle, content} = req.body;
    const info = await Blog.findByIdAndUpdate({_id: id}, {title, subtitle, content}, {new: true});
});

router.delete('/delete/:id', verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const info = await Blog.findByIdAndDelete({_id: id});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog deleted successfully'})
    }
});

router.delete('/delete/comment/:id', verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const {comment} = req.body;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$pull: {comments: comment}, $inc: {commentsCount: -1}}, {new: true});

    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Comment deleted successfully'})
    }
});

export default router;
