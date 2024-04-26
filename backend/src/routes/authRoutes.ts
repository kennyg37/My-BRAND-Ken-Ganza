import express, { Request, Response } from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/auth';
import { verifyToken } from '../middleware/authBlog';


const router = express.Router();


router.get('/data', verifyToken, async (req: Request, res: Response) => {
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
                    return res.json({message: 'Login successful', token, username, account});
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

// swagger for signup route
/**
 * @swagger
 * /v1/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Creates a new user account.
 *     tags:
 *       - Authentication
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
 *         description: User created successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       400:
 *         description: Password does not match or missing
 */

// swagger for the get all users route
/**
 * @swagger
 * /v1/auth/data:
 *   get:
 *     summary: Get all user data
 *     description: Retrieves all user data.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 */

// swagger for the admin login route
/**
 * @swagger
 * /v1/auth/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Logs in an admin user.
 *     tags:
 *       - Authentication
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
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *             token:
 *               type: string
 *               description: JWT token for authentication
 *       400:
 *         description: Please fill all fields
 *       401:
 *         description: User not found or Invalid credentials
 *       500:
 *         description: An error occurred
 */

// swagger for the guest login route
/**
 * @swagger
 * /v1/auth/guest/login:
 *   post:
 *     summary: Guest login
 *     description: Logs in a guest user.
 *     tags:
 *       - Authentication
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
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *             token:
 *               type: string
 *               description: JWT token for authentication
 *       400:
 *         description: Please fill all fields
 *       401:
 *         description: User not found or Invalid credentials
 *       500:
 *         description: An error occurred
 */

// swagger for the update user route
/**
 * @swagger
 * /v1/auth/update/{id}:
 *   put:
 *     summary: Update user information
 *     description: Updates user account information.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to update
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
 *       200:
 *         description: User information updated successfully
 *         schema:
 *           $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

// swagger for the delete user route

/**
 * @swagger
 * /v1/auth/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user account.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

export default router;