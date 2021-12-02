import { executeQueryAsync } from "../data-access-layer/dal.js";

export async function getCartById(customerId) {
    try {
        const oldCart = await executeQueryAsync(`select * from cart where customerId=?`, [customerId])
        if (oldCart.length > 0) {
            return oldCart
        } else {
            const today = new Date()
            const newCart = await executeQueryAsync(`insert into cart (id,customerId,startDate) values(null,?,?)`, [customerId, today])
            const oldCart = await executeQueryAsync(`select * from cart where customerId=?`, [customerId]);
            return oldCart
        }
    } catch (error) {
        console.log(error);
    }
}

export async function addProductsTocart(product) {
    try {
        const ProductsExists = await executeQueryAsync(`delete from cartproducts where cartId=${product.cartId} `)
        console.log(ProductsExists, "DELETED");
    } catch (error) {
        console.log(error);
    }
    try {
        const cartProducts = await executeQueryAsync(`
        insert into cartproducts (id,productId,quantity,price,cartId) value(null,?,?,?,?)`, [product.productId, product.quantity, product.price, product.cartId]);
        console.log(cartProducts, "ADDED");
        return cartProducts
    } catch (error) {

    }
}
export async function getAllcartProducts(cartId) {
    try {
        const cartProducts = await executeQueryAsync(`SELECT cartproducts.cartId,cartproducts.productId, products.productName,cartproducts.price,cartproducts.quantity
        FROM cartproducts
        INNER JOIN products ON cartproducts.productId = products.id WHERE cartproducts.cartId =?;`, [cartId])
        return cartProducts
    } catch (error) {
        console.log(error);
    }
}
export async function deleteCartProduct(id) {
    try {
        const deletedProduct = await executeQueryAsync(`delete from cartproducts where productId=?`, [id])
        return deletedProduct
    } catch (error) {
        console.log(error);
    }
}
