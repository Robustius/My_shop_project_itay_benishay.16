import express from 'express'
import { getCartById } from '../buisness-logic/cart-logic.js';
import { verifyToken } from './auth-controller/loginController.js';
import { verifyLoggedIn } from '../middleware.js';
export const router = express.Router();

router.post('/cart', async (req, res) => {
    try {
        const token = req.body
        const userDetails = verifyToken(token.token);
        const cart = await getCartById(userDetails);
        return res.status(200).json(cart)
    } catch (error) {
        console.log(error);
    }
})