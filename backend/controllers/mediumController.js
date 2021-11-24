import express from 'express'
import { getAllproducts } from '../buisness-logic/product-logic.js'
import { verifyLoggedIn } from '../middleware.js';
export const router = express.Router()

router.get("/", async (reqeust, response) => {
    //sending all the product to the client
    try {
        const products = await getAllproducts();
        return response.send(products);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
});
