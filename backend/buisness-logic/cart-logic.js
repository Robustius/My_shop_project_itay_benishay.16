import { error } from "console";
import { type } from "os";
import { nextTick } from "process";
import { executeQueryAsync } from "../data-access-layer/dal.js";


export async function getCartById(customerId) {
    try {
        //check if card exists?
        const oldCart = await executeQueryAsync(`select count(customerId) as c from cart where customerId=?`, [customerId])
        const numberOfCarts = JSON.parse(JSON.stringify(oldCart[0].c));

        console.log(numberOfCarts, `number`);
        //if not existing create one
        if (numberOfCarts === 0) {
            try {
                const today = new Date();
                const newCart = await executeQueryAsync(`insert into cart (id,customerId,startDate) values(null,?,?)`, [customerId, today]);
                const oldCart = await executeQueryAsync(`select * from cart where customerId=?`, [customerId]);
                return oldCart
            } catch (error) {
                console.log(error);
            }

        } else {
            const getoldCart = await executeQueryAsync(`select * from cart where customerId=?`, [customerId])
            return getoldCart
        }
    } catch (error) {
        console.log(error);
    }
}
export async function findExistingCart(customerId) {
    try {
        const oldCart = await executeQueryAsync(`select count(customerId) as c from cart where customerId=?`, [customerId])
        const numberOfCarts = JSON.parse(JSON.stringify(oldCart[0].c));
        if(numberOfCarts>0){
            const getoldCart = await executeQueryAsync(`select * from cart where customerId=?`, [customerId])
             return getoldCart
        }
    } catch (error) {
        console.log(error);
    }

}

export async function addProductsTocart(product) {
    let cartProducts
    try {
        cartProducts = await executeQueryAsync(`delete  from cartproducts where cartId=${product.cartId} `)

    } catch (error) {
        console.log(error);
    }
    try {
        cartProducts = await executeQueryAsync(`
        insert into cartproducts (id,productId,quantity,price,cartId) value(null,?,?,?,?)`, [product.productId, product.quantity, product.price, product.cartId]);

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
export async function getCustomerDetails(id) {
    try {
        const cDetails = await executeQueryAsync(`select id,city,street from customers where id=?`, [id])
        if (!cDetails) {
            return
        } else {
            return cDetails
        }
    } catch (error) {

    }


}
