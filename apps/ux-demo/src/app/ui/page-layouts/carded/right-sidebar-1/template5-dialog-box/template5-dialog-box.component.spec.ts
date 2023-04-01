import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template5DialogBoxComponent } from './template5-dialog-box.component';

describe('Template5DialogBoxComponent', () => {
  let component: Template5DialogBoxComponent;
  let fixture: ComponentFixture<Template5DialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template5DialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template5DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
