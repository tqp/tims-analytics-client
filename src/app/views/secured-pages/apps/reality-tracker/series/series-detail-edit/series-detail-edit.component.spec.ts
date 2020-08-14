import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDetailEditComponent } from './series-detail-edit.component';

describe('SeriesDetailEditComponent', () => {
  let component: SeriesDetailEditComponent;
  let fixture: ComponentFixture<SeriesDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
