import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDetailEditDialogComponent } from './crud-detail-edit-dialog.component';

describe('CrudDetailEditDialogComponent', () => {
  let component: CrudDetailEditDialogComponent;
  let fixture: ComponentFixture<CrudDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
