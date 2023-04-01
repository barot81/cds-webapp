import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourcesDrawerComponent } from './add-resources-drawer.component';

describe('AddResourcesDrawerComponent', () => {
  let component: AddResourcesDrawerComponent;
  let fixture: ComponentFixture<AddResourcesDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResourcesDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResourcesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
