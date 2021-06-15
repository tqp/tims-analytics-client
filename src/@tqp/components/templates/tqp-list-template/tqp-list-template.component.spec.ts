import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TqpListTemplateComponent } from './tqp-list-template.component';

describe('TqpListTemplateComponent', () => {
  let component: TqpListTemplateComponent;
  let fixture: ComponentFixture<TqpListTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TqpListTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TqpListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
