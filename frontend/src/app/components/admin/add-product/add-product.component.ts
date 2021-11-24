import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products.service';
import { categoryName } from 'src/app/models/Product.model';
import { FormBuilder, FormGroup, } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @ViewChild('f') form: any;
  @ViewChild('imageControl') imageControl: ElementRef;
  newProduct: Product = new Product(undefined, undefined, undefined, undefined, undefined,undefined);
  errors: any;
  categories: any = Object.keys(categoryName).slice(4)

  imageVisited: boolean = false; 
  visible: boolean = false;
  constructor(private productService: ProductsService) { }

  async ngOnInit() {
this.visible=false
  }
  addProduct() {
    return this.visible = true
  }

  onAdd(): void {
    console.log(this.form.errors);
    
  if(!this.newProduct){
    return console.log(this.form.errors);
    
  }
    const fd = Product.convertToFormData(this.newProduct);


    this.productService.add(fd)
      .then(
        (value) => {
          console.log("Added");
          console.log(value);
          this.errors = undefined;
          this.newProduct = new Product(undefined, undefined, undefined, undefined,undefined,undefined);
          this.imageVisited = false;
          this.imageControl.nativeElement.value = "";
         return this.visible=false
          // this.form.reset();
        })
      .catch((error) => {
        console.log("Error (Added?)");
        console.log(error);
        this.errors = error
      });
  }

  saveImage(args: Event): void {
    this.newProduct.image = (args.target as HTMLInputElement).files;
  }

  imageBlur(): void {
    this.imageVisited = true;
  }


}

