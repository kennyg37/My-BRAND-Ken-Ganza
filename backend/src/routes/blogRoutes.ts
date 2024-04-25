import express, { Request, Response } from 'express';
import Blog from '../models/blog';
import { verifyToken } from '../middleware/authBlog';
import {verifyGuestToken} from '../middleware/authBlog';
import { v4 as uuidv4 } from 'uuid'
import AWS from "aws-sdk";
import { S3Client } from '@aws-sdk/client-s3';
import multer from "multer";
import multerS3 from "multer-s3";
import image from '../models/image';

const router = express.Router();

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: 'eu-north-1'
// });

// const s3 = new AWS.S3();


const s3config = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''       
    }
});

let imageUrl: string;
const upload = multer({
    storage: multerS3({
      s3: s3config,
      bucket: 'kenganzabucket1',
      acl: 'public-read',
      key: function (req, file, cb) {
        const key = `images/${uuidv4()}-${file.originalname}`;
        imageUrl = `https://kenganzabucket1.s3.eu-north-1.amazonaws.com/${key}`;
        cb(null, key);
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


router.put('/like/:id', verifyGuestToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$inc: {likes: 1}}, {new: true});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog liked successfully'})
    }
});


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



router.delete('/delete/:id', verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const info = await Blog.findByIdAndDelete({_id: id});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog deleted successfully'})
    }
});


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


router.delete('/delete/like/:id', verifyGuestToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const info = await Blog.findByIdAndUpdate({_id: id}, {$inc: {likes: -1}}, {new: true});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog unliked successfully'})
    }
});
router.delete('/delete/data/:title', verifyToken, async (req: Request, res: Response) => {
    const title = req.params.title;
    const info = await Blog.findOne({title});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        await Blog.findByIdAndDelete(info._id);
        res.json({message: 'Blog deleted successfully'})
    }
});

router.put('/update/data/:title', verifyToken, async (req: Request, res: Response) => {
    const title = req.params.title;
    const {subtitle, content} = req.body;
    const info = await Blog.findOneAndUpdate({title}, {subtitle, content}, {new: true});
    if (!info) {
        return res.status(404).json({message: 'Blog not found'})
    } else {
        res.json({message: 'Blog updated successfully'})
    }
})

// swagger for the main post method
/**
 * @swagger
 * /v1/blog/create:
 *   post:
 *     summary: Create a new blog post
 *     description: Creates a new blog post with an optional image upload.
 *     tags:
 *       - Blog
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: The title of the blog post
 *         required: true
 *         type: string
 *       - name: subtitle
 *         in: formData
 *         description: The subtitle of the blog post
 *         required: true
 *         type: string
 *       - name: content
 *         in: formData
 *         description: The content of the blog post
 *         required: true
 *         type: string
 *       - name: image
 *         in: formData
 *         description: The image to upload for the blog post (optional)
 *         required: false
 *         type: file
 *     responses:
 *       200:
 *         description: Blog created successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

// swagger for the get blogs method
/**
 * @swagger
 * /v1/blog/data:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieves all blog posts.
 *     tags:
 *       - Blog
 *     parameters:
 *      - name: title
 *     
 *     responses:
 *       200:
 *         description: A list of blog posts
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/BlogPost'
 * definitions:
 *   BlogPost:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The unique identifier of the blog post
 *       title:
 *         type: string
 *         description: The title of the blog post
 *       subtitle:
 *         type: string
 *         description: The subtitle of the blog post
 *       content:
 *         type: string
 *         description: The content of the blog post
 *       image:
 *         type: string
 *         description: The URL of the blog post's image
 *       likes:
 *         type: number
 *         description: The number of likes the blog post has received
 *       commentsCount:
 *         type: number
 *         description: The number of comments the blog post has received
 */

// swagger for the like method
/**
 * @swagger
 * /v1/blog/like/{id}:
 *   put:
 *     summary: Like a blog post
 *     description: Increases the like count of a blog post by 1.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the blog post to like
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Blog liked successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: Blog not found
 */

// swagger for the comment put method
/**
 * @swagger
 * /v1/blog/comment/{id}:
 *   put:
 *     summary: Add a comment to a blog post
 *     description: Adds a comment to a blog post and increments the comments count by 1.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the blog post to add a comment to
 *         required: true
 *         schema:
 *           type: string
 *       - name: comment
 *         in: body
 *         description: The comment to add to the blog post
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *             comments:
 *               type: array
 *               items:
 *                 type: string
 *               description: An array of comments for the blog post
 *       404:
 *         description: Blog not found
 */

// swagger for the update method
/**
 * @swagger
 * /v1/blog/update/{id}:
 *   put:
 *     summary: Update a blog post
 *     description: Updates the title, subtitle, and content of a blog post.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the blog post to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: title
 *         in: body
 *         description: The new title for the blog post
 *         required: true
 *         schema:
 *           type: string
 *       - name: subtitle
 *         in: body
 *         description: The new subtitle for the blog post
 *         required: true
 *         schema:
 *           type: string
 *       - name: content
 *         in: body
 *         description: The new content for the blog post
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: Blog not found
 */

// swagger for the delete method
/**
 * @swagger
 * /v1/blog/delete/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     description: Deletes a blog post.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the blog post to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: Blog not found
 */

// swagger for the delete comment method
/**
 * @swagger
 * /v1/blog/delete/comment/{id}:
 *   delete:
 *     summary: Delete a comment from a blog post
 *     description: Deletes a comment from a blog post and decrements the comments count by 1.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the blog post from which to delete the comment
 *         required: true
 *         schema:
 *           type: string
 *       - name: comment
 *         in: body
 *         description: The comment to delete from the blog post
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: Blog not found
 */

// swagger for the delete like method
/**
 * @swagger
 * /v1/blog/delete/like/{id}:
 *   delete:
 *     summary: Unlike a blog post
 *     description: Decreases the like count of a blog post by 1.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the blog post to unlike
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Blog unliked successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: Blog not found
 */

// swagger for the delete data method
/**
 * @swagger
 * /v1/blog/delete/data/{title}:
 *   delete:
 *     summary: Delete a blog post by title
 *     description: Deletes a blog post by title.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: title
 *         in: path
 *         description: The title of the blog post to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: Blog not found
 */

// swagger for the update data method
/**
 * @swagger
 * /v1/blog/update/data/{title}:
 *   put:
 *     summary: Update a blog post by title
 *     description: Updates the subtitle and content of a blog post by title.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: title
 *         in: path
 *         description: The title of the blog post to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: subtitle
 *         in: body
 *         description: The new subtitle for the blog post
 *         required: true
 *         schema:
 *           type: string
 *       - name: content
 *         in: body
 *         description: The new content for the blog post
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: Blog not found
 */



export default router;
