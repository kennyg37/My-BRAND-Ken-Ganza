import express,{ Request, Response } from "express";
import Notification from "../models/notification";

const router = express.Router();

router.get('notifications', async (req: Request, res: Response) => {
    const info = await Notification.find()
    res.send(info)
});

router.post('/notifications/edit', async (req: Request, res: Response) => {
    const {title, message} = req.params;
    const info = new Notification ({
        title,
        message
    })

    res.json(info)
})