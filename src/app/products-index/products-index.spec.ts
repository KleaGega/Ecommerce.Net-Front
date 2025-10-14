import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsIndex } from './products-index';

describe('ProductsIndex', () => {
  let component: ProductsIndex;
  let fixture: ComponentFixture<ProductsIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
