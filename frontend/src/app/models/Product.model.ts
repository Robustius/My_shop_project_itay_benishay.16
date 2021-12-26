import { Categories } from './Categories.model';

export enum categoryName {
  'Milk&Eggs' = 1,
  'Vegetebles&Fruits',
  'Meat&Fish',
  'Wine&Drinks',
}
export class Product {
  constructor(
    public id: number,
    public productName: string,
    public categoryName: categoryName,
    public price: number,
    public imageName: string,
    public image: FileList
  ) {}
  static convertToFormData(product: Product) {
    const fd = new FormData();

    fd.append('id', product.id?.toString());
    fd.append('productName', product.productName);
    fd.append('categoryName', product.categoryName.toString());
    fd.append('price', product.price.toString());
    fd.append('imageName', product.imageName);
    if (product.image) {
      fd.append('image', product.image.item(0));
      return fd;
    } else {
      return fd;
    }
  }
}
