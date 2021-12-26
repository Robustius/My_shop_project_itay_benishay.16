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

export async function addToOrders(order) {
    try {
        returnCart(order);      
        try {
            const currentDate=new Date()
            const orderAdded = await executeQueryAsync(`INSERT INTO activeorders (id,customerId,cartId,price,city,street,deliveryDate,orderDate,ccv) value(null,?,?,?,?,?,?,?,?)`,
                [order.customerId, order.cartId, order.price, order.city,
                order.street, order.deliveryDate, currentDate, order.ccv]);
            console.log(orderAdded[0], 'HEREEEE');
            return
        } catch (error) {
            console.log(error);
        }
       
    } catch (error) {
        console.log(error);
    }
}
async function returnCart(order) {
    try {
        const deleteCart = await executeQueryAsync(`delete from cart where id=?`, [order.cartId])
       
        return deleteCart
    } catch (error) {
        console.log(error);
    }
}
export async function getLastOrder(user) {
    try {
        
        const lastOrder = await executeQueryAsync(`select orderDate,price from activeorders where customerId=? ORDER BY orderDate desc limit 1 `,[user]);
        console.log(lastOrder,`ok`);
        return lastOrder
    } catch (error) {
        console.log(error);
    }
    
}
export async function getNumberOfOrders(){
        try {
            const orders=await executeQueryAsync(`select count(*) as nOrders from activeorders`);
            const products=await executeQueryAsync('select count(*) as nProduct from products')
            
            return [orders,products]
        } catch (error) {
            console.log(error);
        }
        
    }