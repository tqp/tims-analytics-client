import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantDetailEditComponent } from './contestant-detail-edit.component';

describe('ContestantDetailEditComponent', () => {
  let component: ContestantDetailEditComponent;
  let fixture: ComponentFixture<ContestantDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestantDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestantDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
