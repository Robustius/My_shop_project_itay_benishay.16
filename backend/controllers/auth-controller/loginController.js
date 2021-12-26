
import express, { response } from 'express';
import { isRegistered } from '../../buisness-logic/auth-logic.js';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';
import { verify } from 'crypto';

export const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await isRegistered(req.body);
      
        if (!user || user.length < 1) return res.status(403).json('incorrect email or password');
        delete user.password;
        if (user) {
            const token = jwt.sign({ user: user }, 'aosdkasokdaoskdokadsok', { expiresIn: "1000 minutes" });
            return res.status(200).send({ token: token, role: user.role });
        } else {
            return res.status(403).json('incorrect email or password')
        } 
    }
    catch (error) {
        console.log(error);
        response.status(403).send(error)
    }
});
export function verifyToken(token) {
  
    const userDetails = jwt.verify(token, 'aosdkasokdaoskdokadsok');
    return userDetails.user.id
}
