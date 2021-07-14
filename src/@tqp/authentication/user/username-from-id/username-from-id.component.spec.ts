import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameFromIdComponent } from './username-from-id.component';

describe('UsernameFromIdComponent', () => {
  let component: UsernameFromIdComponent;
  let fixture: ComponentFixture<UsernameFromIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsernameFromIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameFromIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
