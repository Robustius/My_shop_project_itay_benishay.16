import Joi from "joi";
export class Product{

    constructor(product){
        this.productName=product.productName,
        this.categoryName=product.categoryName,
        this.price=product.price
        this.imageName=product.imageName
        this.image=product?.image
 }   
 

    static #validationSchema = Joi.object({
        productName: Joi.string().min(5).max(50),
        categoryName: Joi.string().required().min(6).max(50),
        price: Joi.number().required().min(2).max(50),
        imageName:Joi.string().required().min(2).max(50),
        
        
    });

    validate() {
        // const result = Registration.#validationSchema.validate(this, { abortEarly: false });
        // return result.error ? result.error.details.map(err => err) : null;  
       

        const result = Product.#validationSchema.validate(this, { abortEarly: false });
        const errObj = {};
        if (result.error) {
            result.error.details.map(err => {
                
                errObj[err.path[0]] = err.message;
                
            });
           
            return errObj;
        }
        return this.null;
    }
}

// module.exports = Product;
