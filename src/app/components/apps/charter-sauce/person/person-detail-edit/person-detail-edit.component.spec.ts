import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailEditComponent } from './person-detail-edit.component';

describe('PersonDetailEditComponent', () => {
  let component: PersonDetailEditComponent;
  let fixture: ComponentFixture<PersonDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
