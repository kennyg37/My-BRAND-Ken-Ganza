import express, { Request, Response } from "express";
import Sub from "../models/subscribe";


const router = express.Router();

router.get('/data', async (req: Request, res: Response) => {
    const info = await Sub.find()
    res.send(info)
});

router.post('/add', async (req: Request, res: Response) => {
    const {email} = req.params;
    const info = new Sub ({
        email,
        subscribedAt: Date.now(),
        subscribed: true
    })
    await info.save();
    res.json('Subscribed successfully')
})

router.put('/leave', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const info = await Sub.findOneAndUpdate({ email }, { subscribed: false });
        if (!info) {
            return res.status(404).json({ message: 'Email not found' });
        }
        res.json({ message: 'Unsubscribed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// swagger to get all subscribers
/**
 * @swagger
 * /v1/subscribe/data:
 *   get:
 *     summary: Get all subscribers
 *     description: Retrieves all subscribers.
 *     tags:
 *       - Subscribe
 *     responses:
 *       200:
 *         description: Subscribers retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Sub'
 *       500:
 *         description: Internal Server Error
 */


// swagger to subscribe to newsletter
/**
 * @swagger
 * /v1/subscribe/add:
 *   post:
 *     summary: Subscribe to newsletter
 *     description: Subscribes an email to the newsletter.
 *     tags:
 *       - Subscribe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subscribed successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       500:
 *         description: Internal Server Error
 */

// swagger to unsubscribe from newsletter
/**
 * @swagger
 * /v1/subscribe/leave:
 *   put:
 *     summary: Unsubscribe from newsletter
 *     description: Unsubscribes an email from the newsletter.
 *     tags:
 *       - Subscribe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Unsubscribed successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal Server Error
 */


export default router;


