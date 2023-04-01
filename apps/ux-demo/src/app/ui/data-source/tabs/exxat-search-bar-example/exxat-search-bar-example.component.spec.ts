import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatSearchBarExampleComponent } from './exxat-search-bar-example.component';

describe('ExxatSearchBarExampleComponent', () => {
  let component: ExxatSearchBarExampleComponent;
  let fixture: ComponentFixture<ExxatSearchBarExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatSearchBarExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatSearchBarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
