import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDocumentViewerComponent } from './card-document-viewer.component';

describe('CardDocumentViewerComponent', () => {
  let component: CardDocumentViewerComponent;
  let fixture: ComponentFixture<CardDocumentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDocumentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
