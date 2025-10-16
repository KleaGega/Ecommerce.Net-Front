import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDelete } from './products-delete';

describe('ProductsDelete', () => {
  let component: ProductsDelete;
  let fixture: ComponentFixture<ProductsDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
