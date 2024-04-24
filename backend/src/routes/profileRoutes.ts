import express, { Request, Response } from "express";
import Details from "../models/profile";

const router = express.Router()

router.get('/profile', async (req: Request, res: Response) => {
    const info = await Details.find();
    res.send(info);
});

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

// swagger for get info
/**
 * @swagger
 * /v1/profile:
 *   get:
 *     summary: Get profile details
 *     description: Retrieves profile details.
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Profile details retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Details'
 *       500:
 *         description: Internal Server Error
 */

// swagger for edit profile
/**
 * @swagger
 * /v1/profile/edit:
 *   post:
 *     summary: Edit profile details
 *     description: Edits profile details.
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               socials:
 *                 type: object
 *     responses:
 *       200:
 *         description: Profile details edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Details'
 *       500:
 *         description: Internal Server Error
 */

export default router