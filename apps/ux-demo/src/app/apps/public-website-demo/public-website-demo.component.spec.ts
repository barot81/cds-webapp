import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWebsiteDemoComponent } from './public-website-demo.component';

describe('PublicWebsiteDemoComponent', () => {
  let component: PublicWebsiteDemoComponent;
  let fixture: ComponentFixture<PublicWebsiteDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicWebsiteDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWebsiteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
