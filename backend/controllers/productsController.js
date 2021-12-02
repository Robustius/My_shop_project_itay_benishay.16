import express from 'express'
import { getAllproducts, getProductsById, getProductByName } from '../buisness-logic/product-logic.js'
import { verifyLoggedIn } from '../middleware.js';
import fileUpload from 'express-fileupload';
import fs from 'fs'
import path, { dirname } from 'path';
import { dir } from 'console';
export const router = express.Router()

router.use(fileUpload())

router.get("/", verifyLoggedIn, async (reqeust, response) => {
    try {
        const products = await getAllproducts();
        return response.send(products);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
});

router.get('/id/:categoryId', verifyLoggedIn, async (request, response) => {
    try {
        const category = request.params.categoryId
        const products = await getProductsById(category);

        return response.send(products);
    } catch (error) {
        response.status(500).send(error);
        console.log(error);
    }
});

router.get("/name/:productName", verifyLoggedIn, async (request, response) => {
    try {
        const productName = request.params.productName
        const product = await getProductByName(productName);
        return response.status(200).send(product)
    } catch (error) {

    }
});

router.get("/upload/:imageName", async (request, response) => {
    try {
        // Data: 
        
        const imageName = request.params.imageName;
        console.log(imageName);
       
        let imageFile = path.join('D:/projects/My_shop_project_itay_benishay.16/backend/images', imageName);
        if (!fs.existsSync(imageFile)) {
            
            imageFile = locations.notFoundImageFile;
        }
        // Success: 
        response.sendFile(imageFile);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


