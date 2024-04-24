import express, {Request, Response} from 'express'
import Contact from '../models/contact'
import { verifyToken } from '../middleware/authBlog';


const router = express.Router()
router.get('/data', verifyToken, async (req: Request, res: Response) => {
    const info = await Contact.find();
    res.send(info);
});

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

/**
 * @swagger
 * /v1/contact/create:
 *   post:
 *     summary: Create a new contact message
 *     description: Creates a new contact message.
 *     tags:
 *       - Contact
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
 *       200:
 *         description: Message sent successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       500:
 *         description: Internal Server Error
 */

// swagger for get all contact messages route
/**
 * @swagger
 * /v1/contact/data:
 *   get:
 *     summary: Get all contact messages
 *     description: Retrieves all contact messages.
 *     tags:
 *       - Contact
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Contact messages retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal Server Error
 */



export default router