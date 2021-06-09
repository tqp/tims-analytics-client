import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniListDeletedComponent } from './alumni-list-deleted.component';

describe('AlumniListDeletedComponent', () => {
  let component: AlumniListDeletedComponent;
  let fixture: ComponentFixture<AlumniListDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniListDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniListDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
