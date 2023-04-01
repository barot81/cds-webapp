import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template7DialogBoxComponent } from './template7-dialog-box.component';

describe('Template7DialogBoxComponent', () => {
  let component: Template7DialogBoxComponent;
  let fixture: ComponentFixture<Template7DialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template7DialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template7DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
