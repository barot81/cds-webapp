import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFromSiteLocationComponent } from './person-from-site-location.component';

describe('PersonFromSiteLocationComponent', () => {
  let component: PersonFromSiteLocationComponent;
  let fixture: ComponentFixture<PersonFromSiteLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFromSiteLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFromSiteLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
