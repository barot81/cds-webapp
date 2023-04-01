import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresDrawerLinkingTabComponent } from './measures-drawer-linking-tab.component';

describe('MeasuresDrawerLinkingTabComponent', () => {
  let component: MeasuresDrawerLinkingTabComponent;
  let fixture: ComponentFixture<MeasuresDrawerLinkingTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuresDrawerLinkingTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuresDrawerLinkingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
