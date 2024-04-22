import express, {Request, Response} from 'express'
import Contact from '../models/contact'
import { verifyToken } from '../middleware/authBlog';


const router = express.Router()

/**
 * @swagger
 * /v1/feedback/data:
 *   get:
 *     summary: Get all contact information.
 *     responses:
 *       '200':
 *         description: Successful response with all contact information.
 */
router.get('/data', verifyToken, async (req: Request, res: Response) => {
    const info = await Contact.find();
    res.send(info);
});

/**
 * @swagger
 * /v1/feedback/create:
 *   post:
 *     summary: Create a new contact message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Contact message sent successfully.
 */
router.post('/create', async (req: Request, res: Response) => {
    const { name, email, message } = req.body;
    const info = new Contact({
        name,
        email,
        message,
    });
    await info.save();
    res.json({ message: 'Message sent successfully' });
});

export default router