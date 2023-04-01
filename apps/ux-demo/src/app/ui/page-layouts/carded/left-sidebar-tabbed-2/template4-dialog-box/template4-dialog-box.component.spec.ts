import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template4DialogBoxComponent } from './template4-dialog-box.component';

describe('Template4DialogBoxComponent', () => {
  let component: Template4DialogBoxComponent;
  let fixture: ComponentFixture<Template4DialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template4DialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template4DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
