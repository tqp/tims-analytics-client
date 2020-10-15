import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoExpenseListComponent } from './auto-expense-list.component';

describe('AutoExpenseListComponent', () => {
  let component: AutoExpenseListComponent;
  let fixture: ComponentFixture<AutoExpenseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoExpenseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
