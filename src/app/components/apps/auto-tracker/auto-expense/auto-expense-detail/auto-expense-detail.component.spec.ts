import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoExpenseDetailComponent } from './auto-expense-detail.component';

describe('AutoExpenseDetailComponent', () => {
  let component: AutoExpenseDetailComponent;
  let fixture: ComponentFixture<AutoExpenseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoExpenseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoExpenseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
