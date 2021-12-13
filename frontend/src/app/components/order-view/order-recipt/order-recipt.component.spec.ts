import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReciptComponent } from './order-recipt.component';

describe('OrderReciptComponent', () => {
  let component: OrderReciptComponent;
  let fixture: ComponentFixture<OrderReciptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReciptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
