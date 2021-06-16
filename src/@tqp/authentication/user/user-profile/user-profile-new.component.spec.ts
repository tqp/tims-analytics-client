import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileNewComponent } from './user-profile-new.component';

describe('UserProfileComponent', () => {
  let component: UserProfileNewComponent;
  let fixture: ComponentFixture<UserProfileNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
