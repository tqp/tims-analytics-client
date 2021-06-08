import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniDetailComponent } from './alumni-detail.component';

describe('AlumniDetailComponent', () => {
  let component: AlumniDetailComponent;
  let fixture: ComponentFixture<AlumniDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
