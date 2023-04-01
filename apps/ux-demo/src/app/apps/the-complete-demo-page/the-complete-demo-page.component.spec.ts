import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheCompleteDemoPageComponent } from './the-complete-demo-page.component';

describe('TheCompleteDemoPageComponent', () => {
  let component: TheCompleteDemoPageComponent;
  let fixture: ComponentFixture<TheCompleteDemoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheCompleteDemoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheCompleteDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
