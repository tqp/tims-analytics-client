import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonDetailEditComponent } from './season-detail-edit.component';

describe('SeasonDetailEditComponent', () => {
  let component: SeasonDetailEditComponent;
  let fixture: ComponentFixture<SeasonDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
