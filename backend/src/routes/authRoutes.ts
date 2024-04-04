import express, { Request, Response } from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/auth';


const router = express.Router();

router.get('/data', async (req: Request, res: Response) => {
    const info = await User.find();
    res.send(info);
});

router.post('/signup', async (req: Request, res: Response) => {
    const {account, username, email, password} = req.body;
    const saltrounds = 10;
    let hashedPasword;
    try {
        hashedPasword = await hash(password, saltrounds);
    } catch (error) {
        res.json({message: 'Password is required'})
    }
    const confirmPassword = password;
    const info = new User ({
        account,
        username,
        email,
        password: hashedPasword,
        confirmPassword: hashedPasword,
    })
   if (password === confirmPassword) {
        await info.save();
        res.json({message: 'User created successfully'})
    } else {
        res.json({message: 'Password does not match'})
    }
});

router.post('/admin/login', async (req: Request, res: Response) => {
    const {account, username, password} = req.body;
    
    if (!account || !username || !password) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }
    if (account === 'admin'){
        try {
            const user = await User.findOne({account, username});
    
            if (!user){
                return res.status(401).json({message: 'User not found'});
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.sign({username: user.username}, 'secret', {expiresIn: '1h'});
                    return res.json({message: 'Login successful', token});
                } else {
                    return res.status(401).json({message: 'Invalid credentials'});
                }
            }
        } catch (error) {
            res.status(500).json({message: 'An error occurred'});
        }
    } else {
        res.json({message: 'You are not an admin'})
    }
    
});

router.post('/guest/login', async (req: Request, res: Response) => {
    const {account, username, password} = req.body;
    
    if (!account || !username || !password) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }
    if (account === 'guest'){
        try {
            const user = await User.findOne({account, username});
    
            if (!user){
                return res.status(401).json({message: 'User not found'});
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.sign({username: user.username}, 'guest_token', {expiresIn: '1h'});
                    return res.json({message: 'Login successful', token});
                } else {
                    return res.status(401).json({message: 'Invalid credentials'});
                }
            }
        } catch (error) {
            res.status(500).json({message: 'An error occurred'});
        }
    } else {
        res.json({message: 'You are not a guest, use the admin login or signup'})
    }

});

router.put('/update/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const {account, username, email, password} = req.body;
    const saltrounds = 10;
    let updateData: any = { account ,username, email };

    if (password) {
        updateData.password = await bcrypt.hash(password, saltrounds);
    }

    try {
        const info = await User.findByIdAndUpdate({_id: id}, updateData, { new: true });

        if (!info) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(info);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({message: 'User deleted successfully'});
});

export default router;