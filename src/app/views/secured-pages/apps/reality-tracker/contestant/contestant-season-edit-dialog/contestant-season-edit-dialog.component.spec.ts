import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantSeasonEditDialogComponent } from './contestant-season-edit-dialog.component';

describe('ContestantSeasonEditDialogComponent', () => {
  let component: ContestantSeasonEditDialogComponent;
  let fixture: ComponentFixture<ContestantSeasonEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestantSeasonEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestantSeasonEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
