import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import tippy from 'tippy.js';
import { FocusHelper, ViewService } from '../services';

import {
  Content,
  dimensionsChanges,
  inView,
  isComponent,
  isString,
  isTemplateRef,
  NgChanges,
  normalizeClassName,
  onlyTippyProps,
  TippyConfig,
  TippyInstance,
  TippyProps,
  TippyTooltipOptions,
  TIPPY_CONFIG,
  TIPPY_REF,
  ViewOptions,
  ViewRef
} from '../utils';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tooltip]',
  exportAs: 'tooltip',
})
export class TooltipDirective
  implements OnChanges, AfterViewInit, OnDestroy, OnInit
{
  @Input() appendTo: TippyProps['appendTo'];
  @Input() theme: TippyProps['theme'] = 'light';
  @Input() delay: TippyProps['delay'];
  @Input() duration: TippyProps['duration'];
  @Input() hideOnClick: TippyProps['hideOnClick'];
  @Input() interactive: TippyProps['interactive'] = true;
  @Input() interactiveBorder: TippyProps['interactiveBorder'];
  @Input() maxWidth: TippyProps['maxWidth'];
  @Input() 'max-width': TippyProps['maxWidth'];
  @Input() offset: TippyProps['offset'];
  @Input() placement: TippyProps['placement'] = 'right';
  @Input() popperOptions: TippyProps['popperOptions'];
  @Input() showOnCreate: TippyProps['showOnCreate'];
  @Input() trigger: TippyProps['trigger'];
  @Input() triggerTarget: TippyProps['triggerTarget'];
  @Input() zIndex: TippyProps['zIndex'];
  @Input() options?: TippyTooltipOptions;

  @Input() lazy: boolean;
  @Input() variation: string;
  @Input() display: boolean;
  @Input() isEnabled: boolean;
  @Input() className: string | string[];
  @Input() data: any;
  @Input() useHostWidth = false;
  @Input() hideOnEscape = true;
  @Input('tooltip') content: Content;
  @Input('tippyHost') customHost: HTMLElement;

  @Output() visible = new EventEmitter<boolean>();
  @Input() public isVisible = false;

  private instance: TippyInstance;
  private viewRef: ViewRef;
  private destroyed = new Subject<void>();
  private props: Partial<TippyConfig>;
  private enabled = true;
  private variationDefined = false;
  private viewOptions$: ViewOptions;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(TIPPY_CONFIG) private globalConfig: TippyConfig,
    @Inject(DOCUMENT) private _document: Document,
    private injector: Injector,
    private viewService: ViewService,
    private vcr: ViewContainerRef,
    private zone: NgZone,
    private hostRef: ElementRef,
    private renderer: Renderer2,
    private _focusHelper: FocusHelper
  ) {}

  ngOnChanges(changes: NgChanges<TooltipDirective>) {
    if (isPlatformServer(this.platformId)) return;

    let props: Partial<TippyConfig> = Object.keys(changes).reduce(
      (acc, change) => {
        if (change === 'isVisible') return acc;

        acc[change] = changes[change].currentValue;

        return acc;
      },
      {}
    );

    let variation: string;

    if (isChanged<NgChanges<TooltipDirective>>('variation', changes)) {
      variation = changes.variation.currentValue;
      this.variationDefined = true;
    } else if (!this.variationDefined) {
      variation = this.globalConfig.defaultVariation;
      this.variationDefined = true;
    }

    if (variation) {
      props = {
        ...this.globalConfig.variations[variation],
        ...props,
      };
    }

    if (isChanged<NgChanges<TooltipDirective>>('isEnabled', changes)) {
      this.enabled = changes.isEnabled.currentValue;
      this.setStatus();
    }

    if (isChanged<NgChanges<TooltipDirective>>('display', changes)) {
      this.enabled = changes.display.currentValue;
      this.setStatus();
    }

    if (isChanged<NgChanges<TooltipDirective>>('options', changes)) {
      this.options = changes.options.currentValue;
    }

    if (isChanged<NgChanges<TooltipDirective>>('isVisible', changes)) {
      this.isVisible ? this.show() : this.hide();
    }

    this.setProps(props);
  }

  ngOnInit() {
    if (this.useHostWidth) {
      this.props.maxWidth = this.hostWidth;
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      if (this.lazy) {
        inView(this.host)
          .pipe(takeUntil(this.destroyed))
          .subscribe(() => {
            this.createInstance();
          });
      } else {
        this.createInstance();
      }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.instance?.destroy();
    this.destroyView();
  }

  destroyView() {
    this.viewRef?.destroy();
    this.viewRef = null;
  }

  show() {
    this.instance?.show();
  }

  hide() {
    this.instance?.hide();
  }

  enable() {
    this.instance?.enable();
  }

  disable() {
    this.instance?.disable();
  }

  private setProps(props: Partial<TippyConfig>) {
    this.props = props;

    if (this.options && this.options !== null) {
      this.setDefaultTooltipOptions();
      Object.assign(this.props, this.options);
    }

    this.instance?.setProps(onlyTippyProps(props));
  }

  private setDefaultTooltipOptions() {
    if (this.options && this.options !== null) {
      this.options = JSON.parse(JSON.stringify(this.options));
    }

    // Set Default Theme Property To 'Light'
    this.options.theme =
      this.options.theme && this.options.theme !== null
        ? this.options.theme
        : 'light';
    // Set Default Arrow Property To 'True'
    this.options.arrow =
      this.options.arrow && this.options.arrow !== null
        ? this.options.arrow
        : true;
    // Set Default Interactive Property To 'True'
    this.options.interactive =
      this.options.interactive && this.options.interactive !== null
        ? this.options.interactive
        : true;
    // Set Default Placement Property To 'right'
    this.options.placement =
      this.options.placement && this.options.placement !== null
        ? this.options.placement
        : 'right';
    // Map Hover With mouseenter
    this.options.trigger =
      this.options.trigger && this.options.trigger !== null
        ? this.options.trigger.toString().toLowerCase().trim() ===
          'hover'.toString().toLowerCase().trim()
          ? 'mouseenter'
          : this.options.trigger
        : 'mouseenter';

    // Map maxWidth Property with max-width
    if (this.options['max-width'] && this.options['max-width'] !== null) {
      this.options.maxWidth = this.options['max-width'];
    }

    // Map width Property with max-width
    if (this.options['width'] && this.options['width'] !== null) {
      this.options.maxWidth = this.options['width'];
    }

    // Map interactive Property with pointerEvents
    if (
      this.options['pointerEvents'] &&
      this.options['pointerEvents'] !== null
    ) {
      if (this.options.pointerEvents === 'auto') {
        this.options.interactive = true;
      } else {
        this.options.interactive = false;
      }
    }

    // Map show-delay Property with delay
    if (this.options['show-delay'] && this.options['show-delay'] !== null) {
      this.options.delay = [this.options['show-delay'], null];
    }

    // Map hide-delay Property with delay
    if (this.options['hide-delay'] && this.options['hide-delay'] !== null) {
      this.options.delay = [null, this.options['hide-delay']];
    }
  }

  private setStatus() {
    this.enabled ? this.instance?.enable() : this.instance?.disable();
  }

  private get host(): HTMLElement {
    return this.customHost || this.hostRef.nativeElement;
  }

  private get hostWidth(): string {
    return `${this.host.getBoundingClientRect().width}px`;
  }

  private createInstance() {
    if (this.content == null) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.instance = tippy(this.host, {
        allowHTML: true,
        appendTo: document.body,
        ...onlyTippyProps(this.globalConfig),
        ...onlyTippyProps(this.props),
        popperOptions: {
          modifiers: [{
            name: 'computeStyles',
            options: {
                gpuAcceleration: false,
            },
          }]
        },
        onMount: (instance) => {
          this.isVisible = true;
          this.visible.next(true);
          this.useHostWidth && this.listenToHostResize();
          this.globalConfig.onMount?.(instance);
          this.renderer.setStyle(instance.popper, 'word-wrap', 'break-word');
          // Set maxWidth From Options
          if (
            this.options &&
            this.options !== null &&
            ((this.options?.maxWidth && this.options?.maxWidth !== null) ||
              (this.options?.['max-width'] &&
                this.options?.['max-width'] !== null))
          ) {
            const width = this.options?.maxWidth
              ? this.options.maxWidth
              : this.options['max-width'];

            this.renderer.setStyle(instance.popper, 'max-width', width + 'px');
          }
        },
        onCreate: (instance) => {
          if (this.className) {
            for (const klass of normalizeClassName(this.className)) {
              instance.popper.classList.add(klass);
            }
          }
          this.globalConfig.onCreate?.(instance);
          if (this.isVisible === true) {
            instance.show();
          }
        },
        onShow: (instance) => {
          this.zone.run(() => {
            const content = this.resolveContent();
            if (isString(content)) {
              instance.setProps({ allowHTML: false });
            }
            instance.setContent(content);
            this.hideOnEscape && this.handleEscapeButton();
          });
          if (this.useHostWidth) {
            // Don't access `hostWidth` multiple times since it's a getter that calls `getBoundingClientRect()`,
            // which triggers the whole layout update.
            const hostWidth = this.hostWidth;
            instance.popper.style.width = hostWidth;
            instance.popper.style.maxWidth = hostWidth;
            (instance.popper.firstElementChild as HTMLElement).style.maxWidth =
              hostWidth;
          }
          this.globalConfig.onShow?.(instance);
        },
        onShown: () => {
          this.zone.run(() => {
            const _tooltip = <HTMLElement>(
              this._document.querySelector('.tippy-box')
            );
            if (_tooltip && _tooltip !== null) {
              this.renderer.setAttribute(
                _tooltip,
                'aria-label',
                'Tooltip Opened'
              );
            }
            this._focusHelper.shiftFocus();
          });
        },
        onHidden: (instance) => {
          this.destroyView();
          this.isVisible = false;
          this.visible.next(false);
          this.globalConfig.onHidden?.(instance);
          this._focusHelper.shiftFocusBack(instance.reference);
        },
      });

      this.setStatus();
      this.setProps(this.props);
    });
  }

  private resolveContent() {
    if (!this.viewOptions$ && !isString(this.content)) {
      if (isComponent(this.content)) {
        this.viewOptions$ = {
          injector: Injector.create({
            providers: [{ provide: TIPPY_REF, useValue: this.instance }],
            parent: this.injector,
          }),
        };
      } else if (isTemplateRef(this.content)) {
        this.viewOptions$ = {
          context: {
            $implicit: this.hide.bind(this),
            data: this.data,
          },
        };
      }
    }

    this.viewRef = this.viewService.createView(this.content, {
      vcr: this.vcr,
      ...this.viewOptions$,
    });

    let content = this.viewRef.getElement();

    if (isString(content) && this.globalConfig.beforeRender) {
      content = this.globalConfig.beforeRender(content);
    }

    return content;
  }

  private handleEscapeButton() {
    this.pressButton$(document.body, 'Escape')
      .pipe(
        takeUntil(merge(this.destroyed, this.visible.pipe(filter((v) => !v))))
      )
      .subscribe(() => this.hide());
  }

  private pressButton$(element: HTMLElement, codeButton: string) {
    return fromEvent(element, 'keydown').pipe(
      filter(({ code }: KeyboardEvent) => codeButton === code)
    );
  }

  private listenToHostResize() {
    dimensionsChanges(this.host)
      .pipe(takeUntil(merge(this.destroyed, this.visible)))
      .subscribe(() => {
        this.instance.popper.style.width = this.hostWidth;
      });
  }
}

function isChanged<T>(key: keyof T, changes: T) {
  return key in changes;
}
