import { Cities } from "./Customer.model";

export class Order {
    constructor(
        public id: number,
        public customerId: number,
        public cartId: number,
        public price: number,
        public city: Cities,
        public street: string,
        public deliveryDate: string,
        public orderDate: string,
        public ccv: number
    ) { }
    
}
