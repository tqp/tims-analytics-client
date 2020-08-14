import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonCreateDialogComponent } from './season-create-dialog.component';

describe('SeasonCreateDialogComponent', () => {
  let component: SeasonCreateDialogComponent;
  let fixture: ComponentFixture<SeasonCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
