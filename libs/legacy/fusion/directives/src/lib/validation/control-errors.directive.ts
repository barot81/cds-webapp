import { Directive, Optional, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Input, Host, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { takeUntil, map, startWith, debounceTime, distinctUntilChanged, tap, delay, catchError } from 'rxjs/operators';
import { Subject, fromEvent, combineLatest } from 'rxjs';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  ref: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  private readonly _unsubscribe: Subject<any>;

  @Input() customErrors = {};
  @Input() formControlName;
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    private readonly controlDir: NgControl,
    private readonly currentElement: ElementRef) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this._unsubscribe = new Subject();
    this.blurEventHandler();
  }

  ngOnInit() {

    combineLatest([this.control?.valueChanges, this.control?.statusChanges])
      .pipe(
        takeUntil(this._unsubscribe),
        distinctUntilChanged()).subscribe(([value, status]) => {
          status = this.control?.status;
          if (status === 'INVALID' && this.formControlName !== undefined && this.formControlName !== null) {
            const currentControl = this.control.parent.controls[this.formControlName];
            const errors = currentControl.errors;
            const errorMessages = currentControl.errorMessages;
            if (errors !== undefined && errors !== null) {
              this.setErrorMessage(errorMessages, errors);
            }
          } else if (this.ref) {
            this.setError(null, null);
          }
        });
  }

  private setErrorMessage(errorMessages: any, errors: any) {
    if (errorMessages === undefined || errorMessages === null) {
      this.setError(errors, "Please Enter Valid Input");
    }
    else {
      const errorMessage = errorMessages[Object.keys(errors)[0]];
      this.setError(errors, (errorMessage === undefined || errorMessage === null) ? "Please Enter Valid Input" : errorMessage);
    }
  }

  blurEventHandler() {
    fromEvent<any>(this.currentElement.nativeElement, 'blur')
      .pipe(
        map(event => {
          return event.target.value;
        })
      );
  }

  get control() {
    var controlInstance = this.controlDir.control;
    if (controlInstance) {
      return this.controlDir.control;
    }
    return null;

  }

  setError(errors: string, errorMessages: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.errors = errors;
    this.ref.instance.errorMessages = errorMessages;
    this.makeComponentAChild();
  }

  private makeComponentAChild() {
    if (this.currentElement && this.currentElement.nativeElement?.offsetParent) {
      const sibling: HTMLElement = this.currentElement.nativeElement.offsetParent.parentElement?.parentElement;
      if (sibling) {
        sibling.insertBefore(this.ref.location.nativeElement, sibling.lastChild);
      }
    }
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

}
