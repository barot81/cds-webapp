import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  TemplateRef,
  Type,
} from '@angular/core';
import { ExxatOverlayRef } from './exxatoverlay-ref';

@Component({
  selector: 'exxat-exxat-overlay',
  templateUrl: './exxat-overlay.component.html',
  styleUrls: ['./exxat-overlay.component.scss'],
})
export class ExxatOverlayComponent implements OnInit, AfterViewInit {
  contentType: 'template' | 'string' | 'component';
  content: string | TemplateRef<any> | Type<any>;
  context;

  constructor(
    private ref: ExxatOverlayRef,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngAfterViewInit(): void {
    this.focusHelper('focus');
  }

  private focusHelper(type: 'focus' | 'blur') {
    let _overlay = <HTMLElement>(
      this._document.querySelector('#overlay-content')
    );
    if (_overlay && _overlay !== null) {
      setTimeout(() => {
        if (type === 'focus') {
          _overlay.focus({ preventScroll: true });
        } else {
          _overlay.blur();
        }
      });
    }
  }

  close() {
    this.ref.close(null);
  }

  ngOnInit() {
    this.content = this.ref.content;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref),
      };
    } else {
      this.contentType = 'component';
    }
  }
}
