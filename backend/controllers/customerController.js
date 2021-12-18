import express, { response } from 'express'
import { getCartById, addProductsTocart, getAllcartProducts, deleteCartProduct, getCustomerDetails } from '../buisness-logic/cart-logic.js';
import { verifyDate, addToOrders } from "../buisness-logic/order-logic.js"
import { verifyToken } from './auth-controller/loginController.js';
import { verifyLoggedIn } from '../middleware.js';
import * as fs from 'fs'
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
        const productId = req.params.productId
        const result = await deleteCartProduct(productId);
        return res.status(200).send(result)
    } catch (error) {
        console.log(error, 'at DELETE-PRODUCT');
    }

});
router.post("/user/details", verifyLoggedIn, async (req, res) => {
    try {
        const token = req.body
        console.log(token);
        const id = verifyToken(token.token);
        const userDetails = await getCustomerDetails(id);
        return res.status(200).send(userDetails)
    } catch (error) {
        console.log(error);
    }
});
router.post("/user/verifydate", verifyLoggedIn, async (req, res) => {
    try {
        const date = req.body
        console.log(`3$$$$$$$$$$$$$`, date, `3$$$$$$$$$$$$$`);
        const result = await verifyDate(date);
        console.log(result, `HERE`);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }

});
router.post('/user/order', verifyLoggedIn, async (req, res) => {

    try {
        console.log(req.body, `router Post`);
        const order = req.body;

        console.log(JSON.stringify(order), `router Post`);
        const result = await addToOrders(order);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).send(error)
    }

});
router.get('/user/order/recipt', async (req, res) => {
    var fs = require('fs');
fs.writeFile("test.txt", jsonData, function(err) {
    console.log(jsonData);
    if (err) {
        console.log(err);
    }
});
});

// fs.writeFile("test.txt", jsonData, function(err) {
//     if (err) {
//         console.log(err);
//     }
// });


