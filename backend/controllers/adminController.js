import express, { response } from 'express'
import { verifyLoggedIn } from '../middleware.js';
import { addProduct } from '../buisness-logic/product-logic.js';
import fs from 'fs'
import fileUpload from 'express-fileupload'
 
export const router = express.Router();
router.use(fileUpload());
router.post("/", async (request, response) => {
    try {
        
        const productToAdd = request.body
      
        const result = await addProduct(productToAdd,request.files ? request.files.image : null);

        response.status(201).send(result);

    } catch (error) {
        console.log(error);
        response.status(500).send();
    }
});



