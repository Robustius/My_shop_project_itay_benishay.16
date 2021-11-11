
import express, { response } from 'express';
import { isRegistered } from '../../buisness-logic/auth-logic.js';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';

export const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await isRegistered(req.body);
        console.log(req.headers.authorization);
        if (!user || user.length < 1) return res.status(403).json('incorrect email or password');
       
        delete user.password;
        delete user.id;
        
        if (user) {
            const token = jwt.sign({ user: user }, 'aosdkasokdaoskdokadsok', { expiresIn: "100 minutes" });
            
            return res.status(200).send(JSON.stringify(token));

        } else {
            return res.status(403).json('incorrect email or password')
        }
    }
    catch (error) {
        console.log(error);
        response.status(403).send(error)
    }
})
