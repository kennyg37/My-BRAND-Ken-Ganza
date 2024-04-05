import express, { Request, Response } from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/auth';


const router = express.Router();

/**
 * @swagger
 * /v1/auth/data:
 *   get:
 *     summary: Retrieve all users.
 *     responses:
 *       200:
 *         description: A list of users.
 */

router.get('/data', async (req: Request, res: Response) => {
    const info = await User.find();
    res.send(info);
});

/**
 * @swagger
 * /v1/auth/signup:
 *   post:
 *     summary: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully.
 *       400:
 *         description: Password is required or password does not match.
 */

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

/**
* @swagger
* /v1/auth/admin/login:
*   post:
*     summary: Admin login.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               account:
*                 type: string
*               username:
*                 type: string
*               password:
*                 type: string
*     responses:
*       '200':
*         description: Login successful.
*       '401':
*         description: User not found or invalid credentials.
*       '500':
*         description: An error occurred.
*/

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

/** 
 * @swagger
 * /v1/auth/guest/login:
 *   post:
 *     summary: Guest login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful.
 *       '401':
 *         description: User not found or invalid credentials.
 *       '500':
 *         description: An error occurred.
 */


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

/**
 * @swagger
 * /v1/auth/update/{id}:
 *   put:
 *     summary: Update a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *       '400':
 *         description: Invalid request.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: An error occurred.
 */


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

/**
 * @swagger
 * /v1/auth/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: An error occurred.
 */


router.delete('/delete/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({message: 'User deleted successfully'});
});

export default router;