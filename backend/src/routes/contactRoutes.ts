import express, {Request, Response} from 'express'
import Contact from '../models/contact'


const router = express.Router()

router.get('/data', async (req: Request, res: Response) => {
    const info = await Contact.find();
    res.send(info);
});

router.post ('/create', async (req: Request, res: Response) => {
    const {name, email, message} = req.body;
    const info = new Contact ({
        name,
        email,
        message,
    })
    await info.save();
    res.json({message: 'Message sent successfully'})
});

export default router