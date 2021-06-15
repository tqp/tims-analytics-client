import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTimerEditDialogComponent } from './multi-timer-edit-dialog.component';

describe('MultiTimerEditDialogComponent', () => {
  let component: MultiTimerEditDialogComponent;
  let fixture: ComponentFixture<MultiTimerEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiTimerEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTimerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
