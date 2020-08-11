import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoExpenseCategoryComponent } from './auto-expense-category.component';

describe('AutoExpenseCategoryComponent', () => {
  let component: AutoExpenseCategoryComponent;
  let fixture: ComponentFixture<AutoExpenseCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoExpenseCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoExpenseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
