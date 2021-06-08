import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniDetailEditComponent } from './alumni-detail-edit.component';

describe('AlumniDetailEditComponent', () => {
  let component: AlumniDetailEditComponent;
  let fixture: ComponentFixture<AlumniDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
