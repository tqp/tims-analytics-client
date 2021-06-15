import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TqpDetailTemplateComponent } from './tqp-detail-template.component';

describe('TqpDetailTemplateComponent', () => {
  let component: TqpDetailTemplateComponent;
  let fixture: ComponentFixture<TqpDetailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TqpDetailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TqpDetailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
