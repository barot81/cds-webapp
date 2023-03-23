import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[numbersOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if(this._el.nativeElement.value.length > 6)
    this._el.nativeElement.value = this._el.nativeElement.value.substring(0,6);
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
