import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template6DialogBoxComponent } from './template6-dialog-box.component';

describe('Template6DialogBoxComponent', () => {
  let component: Template6DialogBoxComponent;
  let fixture: ComponentFixture<Template6DialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template6DialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template6DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
