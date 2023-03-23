/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/directive-selector */
import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  Host,
  Input,
  Optional,
  Renderer2,
  SkipSelf
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';


export const SEARCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchDirective),
  multi: true
};

@Directive({
  selector: '[search]',
  providers: [SEARCH_CONTROL_VALUE_ACCESSOR]
})
export class SearchDirective implements AfterViewInit, ControlValueAccessor {
  private el: Element;

  public clearVisible = new BehaviorSubject<boolean>(false);
  clearVisible$ = this.clearVisible.asObservable();

  private input: HTMLInputElement;
  private clearButton: HTMLElement;

  keyUpStream: Observable<KeyboardEvent>;

  clickStream: Observable<Event>;

  @Input() formControl: FormControl;

  @Input() formControlName: string;

  constructor(
    private readonly elRef: ElementRef,
    private readonly renderer: Renderer2,
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {
    this.setElement();
  }

  //#region [ControlValueAccessor Methods]

  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }

  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  //#endregion

  // get ahold of FormControl instance no matter formControl or formControlName is given.
  // If formControlName is given, then controlContainer.control is the parent FormGroup/FormArray instance.
  get control() {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName)
    );
  }

  ngAfterViewInit(): void {
    this.setElement();

    this.clearVisible$.subscribe((result) => {
      if (this.clearButton && this.clearButton !== null) {
        if (!result) {
          this.renderer.setStyle(this.clearButton, 'visibility', 'hidden');
        } else {
          this.renderer.removeStyle(this.clearButton, 'visibility');
        }
      }
    });

    this.keyUpStream?.subscribe((event) => {
      this.clearVisible.next(false);
      if (
        event.target &&
        event.target !== null &&
        (event.target as HTMLInputElement).value &&
        (event.target as HTMLInputElement).value !== null
      ) {
        (event.target as HTMLInputElement).value.length > 0
          ? this.clearVisible.next(true)
          : this.clearVisible.next(false);
      }
    });

    this.clickStream?.subscribe(() => {
      this.input.value = '';
      if (this.control && this.control !== null) {
        this.control.reset();
      }
      this.clearVisible.next(false);
      this.input.focus();
    });

    this.control.valueChanges.subscribe((value) => {
      if (value && value !== null && value.length > 0) {
        this.setClearButtonVisibility();
      }
    });
  }

  setElement() {
    if (
      this.elRef &&
      this.elRef !== null &&
      this.elRef.nativeElement &&
      this.elRef.nativeElement !== null
    ) {
      this.el = this.elRef.nativeElement;
      this.clearButton = this.el.querySelector('.clear-button');
      this.input = this.el.querySelector('#inputBox');
      this.setClearButtonVisibility();
      this.addEventListners();
    }
  }

  addEventListners() {
    if (this.input && this.input !== null) {
      this.keyUpStream = fromEvent(
        this.input,
        'keyup'
      ) as Observable<KeyboardEvent>;
    }

    if (this.clearButton && this.clearButton !== null) {
      this.clickStream = fromEvent(
        this.clearButton,
        'click'
      ) as Observable<Event>;
    }
  }

  setClearButtonVisibility() {
    if (
      this.input &&
      this.input !== null &&
      this.clearButton &&
      this.clearButton !== null
    ) {
      this.input.value.length > 0
        ? this.clearVisible.next(true)
        : this.clearVisible.next(false);
    }
  }
}