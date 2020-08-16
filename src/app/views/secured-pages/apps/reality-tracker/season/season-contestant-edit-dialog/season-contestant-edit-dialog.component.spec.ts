import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonContestantEditDialogComponent } from './season-contestant-edit-dialog.component';

describe('SeasonContestantEditDialogComponent', () => {
  let component: SeasonContestantEditDialogComponent;
  let fixture: ComponentFixture<SeasonContestantEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonContestantEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonContestantEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
