import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template3DialogBoxComponent } from './template3-dialog-box.component';

describe('Template3DialogBoxComponent', () => {
  let component: Template3DialogBoxComponent;
  let fixture: ComponentFixture<Template3DialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template3DialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template3DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
