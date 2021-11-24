import { executeQueryAsync } from "../data-access-layer/dal.js";

export async function getCartById(customerId) {
    try {
        const oldCart = await executeQueryAsync(`select * from cart where customerId=?`, [customerId])
        if (oldCart.length > 0) {
            console.log('THERE is a Cart', oldCart);
            return oldCart
        } else {
            const today = new Date()
            const newCart = await executeQueryAsync(`insert into cart (id,customerId,startDate) values(null,?,?)`, [customerId, today])
            console.log(newCart, "NEW CART ADDED");
            const oldCart = await executeQueryAsync(`select * from cart where customerId=?`, [customerId]);
            return oldCart
        }
    } catch (error) {
        console.log(error);
    }
}
