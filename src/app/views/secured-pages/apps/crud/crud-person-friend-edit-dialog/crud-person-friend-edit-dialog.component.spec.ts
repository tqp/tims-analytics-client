import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPersonFriendEditDialogComponent } from './crud-person-friend-edit-dialog.component';

describe('CrudPersonFriendEditDialogComponent', () => {
  let component: CrudPersonFriendEditDialogComponent;
  let fixture: ComponentFixture<CrudPersonFriendEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudPersonFriendEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPersonFriendEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
