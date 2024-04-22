import express, { Request, Response } from 'express';
import Blog from '../models/blog';
import { verifyToken } from '../middleware/authBlog';
import {verifyGuestToken} from '../middleware/authBlog';
import multer from 'multer';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import multerS3 from 'multer-s3';
import { S3, S3Client } from '@aws-sdk/client-s3';

const router = express.Router();

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-north-1'
});

const s3Client = s3 as unknown as S3;

const upload = multer({
    storage: multerS3({
      s3: s3Client,  
      bucket: 'kenganzabucket1',
      acl: 'public-read', 
      key: function (req, file, cb) {
        cb(null, 'images/' + file.originalname); 
      }
    })
  });


router.post('/create', verifyToken, upload.single('image'), async (req: Request, res: Response) => {
    const {title, subtitle, content} = req.body;
    const image = req.file;
    
    if (!image) {
        const info = new Blog ({
            title,
            subtitle,
            content
        })
    await info.save();
    res.json({message: 'Blog created successfully but has no image'})
    res.json(info);
    
    } else {

        const params = {
            Bucket: 'kenganzabucket1',
            Key: `images/${uuidv4()}-${image.originalname}`,
            Body: image.buffer,
            ContentType: image.mimetype,
            ACL: 'public-read'
          };

        const data = await s3.putObject(params).promise();;
        const imageUrl = `https://kenganzabucket1.s3.eu-north-1.amazonaws.com/${params.Key}`;
        ;

        const info = new Blog ({
            title,
            subtitle,
            content,
            image: imageUrl
        })
        await info.save();
        res.json({message: 'Blog created successfully'})
        res.json(info);
    }
});

router.get('/data', async (req: Request, res: Response) => {
    const info = await Blog.find();
    res.send(info);
});

/**
 * @swagger
 * /v1/blog/like/{id}:
 *   put:
 *     summary: Like a blog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of blog to like.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog liked successfully.
 */

router.put('/like/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$inc: {likes: 1}}, {new: true});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog liked successfully'})
    }
});

/**
 * @swagger
 * /v1/blog/comment/{id}:
 *   put:
 *     summary: Comment on a blog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of blog to comment on.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment added successfully.
 */

router.put('/comment/:id', verifyGuestToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const {comment} = req.body;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$push: {comments: comment}, $inc: {commentsCount: 1}}, {new: true});

    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Comment added successfully', comments: info['comments']})
    }
});

/**
 * @swagger
 * /v1/blog/update/{id}:
 *   put:
 *     summary: Update a blog by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog updated successfully.
 *       '404':
 *         description: Blog not found.
 */

router.put('/update/:id', verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title, subtitle, content} = req.body;
    const info = await Blog.findByIdAndUpdate({_id: id}, {title, subtitle, content}, {new: true});

    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog updated successfully'})
    }
});

/**
 * @swagger
 * /v1/blog/delete/{id}:
 *   delete:
 *     summary: Delete a blog by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog deleted successfully.
 *       '404':
 *         description: Blog not found.
 */

router.delete('/delete/:id', verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const info = await Blog.findByIdAndDelete({_id: id});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog deleted successfully'})
    }
});

/**
 * @swagger
 * /v1/blog/delete/comment/{id}:
 *   delete:
 *     summary: Delete a comment from a blog by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: comment
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comment deleted successfully.
 *       '404':
 *         description: Blog not found.
 */

router.delete('/delete/comment/:id', verifyGuestToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const {comment} = req.body;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$pull: {comments: comment}, $inc: {commentsCount: -1}}, {new: true});

    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Comment deleted successfully'})
    }
});

/**
 * @swagger
 * /v1/blog/delete/like/{id}:
 *   delete:
 *     summary: Remove a like from a blog by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog unliked successfully.
 *       '404':
 *         description: Blog not found.
 */

router.delete('/delete/like/:id', verifyGuestToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$inc: {likes: -1}}, {new: true});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog unliked successfully'})
    }
});

export default router;
