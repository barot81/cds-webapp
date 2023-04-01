import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesDemoComponent } from './resources-demo.component';

describe('ResourcesDemoComponent', () => {
  let component: ResourcesDemoComponent;
  let fixture: ComponentFixture<ResourcesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
