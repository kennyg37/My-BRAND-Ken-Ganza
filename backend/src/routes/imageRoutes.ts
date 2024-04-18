import express, { Request, Response } from 'express';
import multer from 'multer';
import Image from '../models/image';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const image = new Image({
            data: req.file.buffer,
            contentType: req.file.mimetype
        });
        await image.save();
        res.status(201).send('Image uploaded successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to upload image');
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch image');
    }
});


// Get an image by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch image');
    }
});

export default router;
