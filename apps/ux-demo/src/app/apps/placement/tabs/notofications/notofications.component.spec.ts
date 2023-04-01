import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotoficationsComponent } from './notofications.component';

describe('NotoficationsComponent', () => {
  let component: NotoficationsComponent;
  let fixture: ComponentFixture<NotoficationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotoficationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotoficationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
