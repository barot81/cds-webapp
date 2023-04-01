import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSitesDemoPageComponent } from './explore-sites-demo-page.component';

describe('ExploreSitesDemoPageComponent', () => {
  let component: ExploreSitesDemoPageComponent;
  let fixture: ComponentFixture<ExploreSitesDemoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreSitesDemoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreSitesDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
