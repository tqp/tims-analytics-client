import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPersonFriendEditPageComponent } from './crud-person-friend-edit-page.component';

describe('CrudPersonFriendEditPageComponent', () => {
  let component: CrudPersonFriendEditPageComponent;
  let fixture: ComponentFixture<CrudPersonFriendEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudPersonFriendEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPersonFriendEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
