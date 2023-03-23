import { NgZone, Renderer2, Directive, Input } from '@angular/core';

@Directive({
  selector: '[focusDirective]'
})
export class FocusDirective {
  @Input() cssSelector: string

  constructor(
    private _ngZone: NgZone,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    console.log(this.cssSelector);
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this._renderer.selectRootElement(this.cssSelector).focus();
      }, 0);
    });
  }
}
