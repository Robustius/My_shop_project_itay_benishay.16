import { executeQueryAsync } from "../data-access-layer/dal.js"
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid';
import { URL } from 'url'
import mv from "mv"
import fileUpload from 'express-fileupload'

export async function getAllproducts() {
    try {
        const products = await executeQueryAsync(`select * from products `)
        return products
    } catch (error) {
        console.log(error);

    }
}
export async function addProduct(product, image) {

    // npm i uuid
    // const __filename = new URL(import.meta.url).pathname;
    // Will contain trailing slash
    // const __dirname = new URL(import.meta.url).pathname
    try {
        if (image == null) {

            throw console.log(image);
        }
        let imgName = `${product.imageName}.png`;
        const absolutePath = path.join('D:/projects/My_shop_project_itay_benishay.16/backend/images', imgName);

        await image.mv(absolutePath)  // mv = move 

    } catch (error) {
        console.log(error);
    }

    const n = uuidv4();

    const categoryId = await executeQueryAsync(
        `select categoryId from category where categoryName='${product.categoryName}'`);



    const result = await executeQueryAsync(
        `insert into products (id,productName,price,imgId,categoryId) values (null,?,?,?,?)`, [product.productName, product.price, product.imageName, categoryId[0].categoryId]);

    return result
}