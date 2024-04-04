import express, { Request, Response } from "express";
import Details from "../models/profile";

const router = express.Router()

router.get('profile', async(res: Response, req: Request) => {
    const info = await Details.find()
    res.send(info)
})

router.post('/profile/edit', async(req: Request, res: Response) => {
    const {firstName, lastName, phone, socials} = req.params;
    const info = new Details ({
        firstName,
        lastName,
        phone,
        socials
    })

    res.json(info)
})

export default router