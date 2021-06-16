import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileOrigComponent } from './user-profile-orig.component';

describe('UserProfileOrigComponent', () => {
  let component: UserProfileOrigComponent;
  let fixture: ComponentFixture<UserProfileOrigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileOrigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileOrigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
