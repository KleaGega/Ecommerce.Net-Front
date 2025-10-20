import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDelete } from './category-delete';

describe('CategoryDelete', () => {
  let component: CategoryDelete;
  let fixture: ComponentFixture<CategoryDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
