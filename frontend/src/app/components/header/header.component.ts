import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() toggleUserCart:EventEmitter<any>=new EventEmitter()
@Input()  cartBarOpen:boolean =true
  constructor() { }

  ngOnInit(): void {
   
  }
  toggleCart(){
      this.toggleUserCart.emit()
  }
}
