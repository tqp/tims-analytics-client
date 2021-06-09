import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniContactEditDialogComponent } from './alumni-contact-edit-dialog.component';

describe('AlumniContactEditDialogComponent', () => {
  let component: AlumniContactEditDialogComponent;
  let fixture: ComponentFixture<AlumniContactEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniContactEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniContactEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
