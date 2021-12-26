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
        console.log(product.imageName);
        let imgName = `${product.imageName}.png`;
        const absolutePath = path.join('D:/projects/My_shop_project_itay_benishay.16/backend/images', imgName);
        await image.mv(absolutePath)
    } catch (error) {
        console.log(error);
    }
    const n = uuidv4();
    const categoryId = await executeQueryAsync(
        `select categoryId from category where categoryName='${product.categoryName}'`);
    const result = await executeQueryAsync(
        `insert into products (id,productName,price,imageName,categoryId) values (null,?,?,?,?)`, [product.productName, product.price, product.imageName, categoryId[0].categoryId]);
    return result
}
export async function editProdut(product, image) {
    try {

        if (image == null) {
            const n = uuidv4();
            console.log(n, product.id);
            const categoryId = await executeQueryAsync(
                `select categoryId from category where categoryName='${product.categoryName}'`);

            const result = await executeQueryAsync(
                `update products 
                SET productName=?,price=?,categoryId=? where id=?`, [product.productName, product.price, categoryId[0].categoryId, product.id]);
            return result
        } else {
            try {
                const categoryId = await executeQueryAsync(
                    `select categoryId from category where categoryName='${product.categoryName}'`);

                const result = await executeQueryAsync(
                    `update products 
                SET productName=?,price=?,imageName=?,categoryId=? where id=?`, [product.productName, product.price, product.imageName, categoryId[0].categoryId, product.id]);

                let imgName = `${product.imageName}.png`;
                const absolutePath = path.join('D:/projects/My_shop_project_itay_benishay.16/backend/images', imgName);
                await image.mv(absolutePath)

                return result
            } catch (error) {
                console.log(error);
            }
        }

    } catch (error) {
        console.log(error);
    }


}
export async function getImageName(id) {
    try {

        const result = await executeQueryAsync(`select imageName from products where id=?`, [id]);
        return result
    } catch (error) {
        return error
    }
}

export async function getProductsById(categoryId) {
    // const id = await getProductId(category);
    try {
        const result = await executeQueryAsync(`
        select * from products where categoryId=?`, [categoryId])

        return result

    } catch (error) {
        console.log(error);
    }
}
export async function getProductId(category) {
    const categoryId = await executeQueryAsync(`select categoryId from category where categoryName='${category}'`);
    return categoryId
}

export async function getProductByName(name) {
    try {
        const result = await executeQueryAsync(`select * from products where productName=?`, [name]);
        return result
    } catch (error) {
        console.log(error);
    }
}