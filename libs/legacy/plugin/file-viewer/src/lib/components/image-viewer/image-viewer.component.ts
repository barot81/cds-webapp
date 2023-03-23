import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements AfterViewInit {
  @ViewChild('viewerImage', { read: ElementRef, static: false })
  viewerImage: ElementRef;
  imageIndex;
  @ViewChild('imagewrapper', { static: false }) wrapper: ElementRef;
  currentImageLink;
  private _canvasDim = { width: 10, height: 10 };
  get canvasDim() {
    return this._canvasDim;
  }
  set src(input: Blob | MediaSource) {
    this.currentImageLink = URL.createObjectURL(input);
    let objectURL = URL.createObjectURL(input);
    this.currentImageLink = objectURL;
  }

  ngAfterViewInit() {
    this.updateCanvasDim();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateCanvasDim();
  }

  private updateCanvasDim() {
    const el =
      this.wrapper && this.wrapper.nativeElement
        ? this.wrapper.nativeElement
        : null;
    if (
      el &&
      (el.offsetWidth !== this._canvasDim.width ||
        el.offsetHeight !== this._canvasDim.height)
    ) {
      const newDim = { width: el.offsetWidth - 2, height: el.offsetHeight - 2 };
      setTimeout(() => (this._canvasDim = newDim), 0);
    }
  }
  constructor(private sanitizer: DomSanitizer) {}
}
