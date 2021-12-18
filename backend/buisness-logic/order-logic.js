import { executeQueryAsync } from "../data-access-layer/dal.js";

export async function verifyDate(date) {
    try {

        const isBusy = await executeQueryAsync("select count(deliveryDate) as c from activeorders where deliveryDate=?", [date.date])
        if (isBusy == null) {
            return (`date is available`);
        }
        return isBusy
    } catch (error) {
        console.log(error);
    }


}
export async function  addToOrders(order) {
    try { 
console.log(order.price)
        const result = await executeQueryAsync(`INSERT INTO activeorders (id,customerId,cartId,price,city,street,deliveryDate,orderDate,ccv) value(null,?,?,?,?,?,?,?,?)`,
            [order.customerId, order.cartId, order.price, order.city,
            order.street, order.deliveryDate, order.orderDate, order.ccv]);
         console.log(result);
        return console.log(order);
    } catch (error) {
        console.log(error); 
    }
}
