export enum categoryName {
    "Milk&Eggs" = 1,
    "Vegetebles&Fruits",
    "Meat&Fish",
    "Wine&Drinks"



}
export class Product {
    constructor(
        public productName: string,
        public categoryName: number,
        public price: number,
        public imageName: string,
        public image: FileList

    ) { }
    static convertToFormData(product: Product) {
        const fd = new FormData();

        fd.append("productName", product.productName);
        fd.append("categoryName", product.categoryName.toString());
        fd.append("price", product.price.toString());
        fd.append("imageName", product.imageName);
        if (product.image) {
            fd.append("image", product.image.item(0));
            console.log(`im here`);
            
            return fd;
        } else {
            console.log(`im there`);
            return fd;
        }
    }
}
