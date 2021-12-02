import express, { response } from 'express'
import { getCartById, addProductsTocart, getAllcartProducts,deleteCartProduct } from '../buisness-logic/cart-logic.js';
import { verifyToken } from './auth-controller/loginController.js';
import { verifyLoggedIn } from '../middleware.js';
export const router = express.Router();

router.post('/cart', verifyLoggedIn, async (req, res) => {
    try {
        const token = req.body
        const userDetails = verifyToken(token.token);
        const cart = await getCartById(userDetails);
        return res.status(200).json(cart)
    } catch (error) {
        console.log(error);
    }
});

router.post('/cart/add', verifyLoggedIn, async (req, res) => {
    try {

        const cartProducts = req.body

        const result = cartProducts.forEach(async (element) => {
            await addProductsTocart(element)
        });
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
    }

});
router.get(`/cart/get/:id`, verifyLoggedIn, async (req, res) => {
    try {

        const cartId = req.params.id

        const result = await getAllcartProducts(cartId);
        return res.status(200).send(result)
    } catch (error) {

    }

});

router.delete(`/cart/delete-product/:productId`, async (req, res) => {
    try {
        const productId=req.params.productId
        const result=await deleteCartProduct(productId);
        return res.status(200).send(result)
    } catch (error) {
        console.log(error,'at DELETE-PRODUCT');
    }

})