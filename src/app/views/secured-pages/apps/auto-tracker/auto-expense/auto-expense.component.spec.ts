import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoExpenseComponent } from './auto-expense.component';

describe('AutoExpenseComponent', () => {
  let component: AutoExpenseComponent;
  let fixture: ComponentFixture<AutoExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
