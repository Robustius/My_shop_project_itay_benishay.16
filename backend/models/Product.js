export class Product{
    constructor(product){
        this.productName=product.productName,
        this.categoryName=product.categoryName,
        this.price=product.price
        this.imageName=product.imageName
        this.image=product?.image
    }
}