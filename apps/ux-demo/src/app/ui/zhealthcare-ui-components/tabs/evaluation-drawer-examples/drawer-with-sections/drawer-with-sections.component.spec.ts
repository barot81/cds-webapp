import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerWithSectionsComponent } from './drawer-with-sections.component';

describe('DrawerWithSectionsComponent', () => {
  let component: DrawerWithSectionsComponent;
  let fixture: ComponentFixture<DrawerWithSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerWithSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerWithSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
