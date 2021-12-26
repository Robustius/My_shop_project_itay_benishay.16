import express, { response } from 'express'
import { verifyLoggedIn } from '../middleware.js';
import { addProduct, getProductId, editProdut } from '../buisness-logic/product-logic.js';
import fs from 'fs'
import fileUpload from 'express-fileupload'
import { Product } from '../models/Product.js';

export const router = express.Router();
router.use(fileUpload());

router.post("/", async (request, response) => {
    try {

        const productToAdd = new Product(request.body);
const errors=productToAdd.validate()
console.log(errors);
        const result = await addProduct(productToAdd, request.files ? request.files.image : null);

        response.status(201).send(result);

    } catch (error) {

        response.status(500).send();
    }
});

router.get('/category-id', async (req, res) => {
    try {
        const categoryId = req.body
        const result = await getProductId(categoryId);
        return res.send(result)
    } catch (error) {
        console.log(error);
    }

});

router.put('/edit', async (request, response) => {
    try {

        const productToEdit = request.body

        const afterEdit = await editProdut(productToEdit, request.files ? request.files.image : null);

        return response.status(200).send(afterEdit)
    } catch (error) {
        console.log(error);
        return response.status(500).send(error.data)
    }
});



