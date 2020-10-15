import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoExpenseDetailEditComponent } from './auto-expense-detail-edit.component';

describe('AutoExpenseDetailEditComponent', () => {
  let component: AutoExpenseDetailEditComponent;
  let fixture: ComponentFixture<AutoExpenseDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoExpenseDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoExpenseDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
