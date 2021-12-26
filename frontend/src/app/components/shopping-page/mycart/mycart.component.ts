import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartModel } from 'src/app/models/Cart.model';
import { CartProducts } from 'src/app/models/CartProducts.model';
import { Product } from 'src/app/models/Product.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { categoryName } from 'src/app/models/Product.model';
import { Categories } from 'src/app/models/Categories.model';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css'],
})
export class MycartComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  @ViewChild('imageControl') imageControl: ElementRef;
  errors: any;
  editOpen:boolean=false
  @Input() products: Product[];
  productToEdit: any = new Product(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  @Input() cartProducts: CartProducts[] = [];
  @Input() cartDetails: CartModel;
  cartId: number;
  totalPrice: number = 0;
  isAdmin: boolean;
  adminCheck = this.router.url == '/adminview' ? true : false;
  private messageSubscription: Subscription;
  categories: string[] = Object.keys(categoryName).slice(4);
  
  constructor(
    private msg: MessengerService,
    private custServ: CustomerService,
    public router: Router,
    private prodService: ProductsService
  ) {}

  ngOnInit(): void {
    
    this.adminCheck ? (this.products = []) : this.updateCart(this.cartId);
    this.productToEdit = undefined;
    this.handleSubscription();
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }
 
  async updateCart(id: number) {
    this.custServ
      .getCart()
      .then((value) => {
        this.cartId = value[0].id;
      })
      .catch((error) => console.log(error))
      .finally(() => {
     
        this.custServ.getCartItems(this.cartId).then((value) => {
        

          
          this.cartProducts = value;

          this.calculateTotal();
        });
      });
  }

  handleSubscription() {
    this.messageSubscription = this.msg.getMsg().subscribe(
      (product: any[]) => {
        if (this.router.url == '/home') {
          return this.addProductToCart(product[0], product[1]);
        } else if (this.router.url == '/adminview') {
          return this.ProductToManageView(product[0]);
        }
      },
      (error) => console.log(error)
    );
  }

  ProductToManageView(product: Product) {
    let currentCategory;
    this.productToEdit = product;
  
    currentCategory = this.categories[this.productToEdit.categoryId];
    this.productToEdit.categoryName = currentCategory;
    this.editOpen=!this.editOpen
  }
  onEdit() {
    this.editOpen=!this.editOpen;
    const fd = Product.convertToFormData(this.productToEdit);
   
   
    this.prodService
      .Edit(fd)
      .then((value) => {
        this.errors = undefined;
        this.productToEdit = new Product(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        );

        this.productToEdit = undefined;
        return console.log(`done!`);
      })
      .catch((error) => {
        console.log(error);
        this.errors = error;
      });
  }
  saveImage(args: Event): void {
    this.productToEdit.image = (args.target as HTMLInputElement).files;
  }

  addProductToCart(product: Product, quantity: number) {
   
    let productExists = false;
    for (let i in this.cartProducts) {
      if (this.cartProducts[i].productId === product.id) {
      
        this.cartProducts[i].quantity += quantity;
        productExists = true;
        break;
      }
    }
    if (!productExists) {
    
      this.cartProducts.push({
        id: null,
        productName: product.productName,
        productId: product.id,
        quantity: quantity,
        price: product.price,
        cartId: this.cartDetails.id,
      });
    }
    this.custServ.addToCart(this.cartProducts).then((value) => {
    
    });
    this.calculateTotal();
  }
  calculateTotal() {
    this.totalPrice = 0;

    this.cartProducts.forEach((product) => {
      this.totalPrice += product.quantity * product.price;
    });
  }
}
