import express, { response } from 'express'
import { getAllproducts,getProductsById } from '../buisness-logic/product-logic.js'
import { verifyLoggedIn } from '../middleware.js';
export const router = express.Router()

router.get("/",verifyLoggedIn, async (reqeust, response) => {

    try {
        const products = await getAllproducts();
        return response.send(products);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
});

router.get('/:categoryId',verifyLoggedIn, async (request, response) => {  
    try {
        const category = request.params.categoryId
        console.log(category);
        
        const products = await getProductsById(category);
        return response.send(products);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
})
