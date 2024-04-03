import express, { Request, Response } from "express";
import Sub from "../models/subscribe";


const router = express.Router();

router.get('/subscribers', async (req: Request, res: Response) => {
    const info = await Sub.find()
    res.send(info)
});

router.post('/subscribe', async (req: Request, res: Response) => {
    const {email} = req.params;
    const info = new Sub ({
        email,
        subscribedAt: Date.now(),
        subscribed: true
    })

    res.json('Subscribed successfully')
})

router.post('/unsubscribe', async (req: Request, res: Response) => {
    const {email} = req.params;
    const info = new Sub ({
        email,
        subscribed: false
    })
    res.json('Unsubscribed successfully')
});

export default router;


