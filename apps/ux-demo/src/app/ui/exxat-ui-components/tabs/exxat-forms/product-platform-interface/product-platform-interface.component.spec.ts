import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlatformInterfaceComponent } from './product-platform-interface.component';

describe('ProductPlatformInterfaceComponent', () => {
  let component: ProductPlatformInterfaceComponent;
  let fixture: ComponentFixture<ProductPlatformInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPlatformInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPlatformInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
