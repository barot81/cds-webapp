/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  A,
  DOWN_ARROW,
  END,
  ENTER,
  ESCAPE,
  HOME,
  NINE,
  SPACE,
  UP_ARROW,
  Z,
  ZERO,
} from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  MatOption,
  _countGroupLabelsBeforeOption,
} from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {
  delay,
  filter,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

/** The max height of the select's overlay panel. */
const SELECT_PANEL_MAX_HEIGHT = 296;

export type ToggleAllType = {
  isSelectedAll: boolean;
  values: Array<any>;
};

@Component({
  selector: 'zhealthcare-mat-select-search',
  templateUrl: './zhealthcare-mat-select-search.component.html',
  styleUrls: ['./zhealthcare-mat-select-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => zhealthcareMatSelectSearchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class zhealthcareMatSelectSearchComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  //#region [Input & Ouput Declarations]

  /** Label of the search placeholder */
  @Input() placeholderLabel = 'Search';

  /** Type of the search input field */
  @Input() type = 'text';

  /** Label to be shown when no entries are found. Set to null if no message should be shown. */
  @Input() noEntriesFoundLabel = 'No entry matches';

  /**
   *  Text that is appended to the currently active item label announced by screen readers,
   *  informing the user of the current index, value and total options.
   *  eg: Bank R (Germany) 1 of 6
   */
  @Input() indexAndLengthScreenReaderText = ' of ';

  /**
   * Whether or not the search field should be cleared after the dropdown menu is closed.
   */
  @Input() clearSearchInput = true;

  /** Whether to show the search-in-progress indicator */
  @Input() searching = false;

  /** Disables initial focusing of the input field */
  @Input() disableInitialFocus = false;

  /** Enable clear input on escape pressed */
  @Input() enableClearOnEscapePressed = false;

  /**
   * Prevents home / end key being propagated to mat-select,
   * allowing to move the cursor within the search input instead of navigating the options
   */
  @Input() preventHomeEndKeyPropagation = false;

  /** Disables scrolling to active options when option list changes. Useful for server-side search */
  @Input() disableScrollToActiveOnOptionsChanged = false;

  /** Adds 508 screen reader support for search box */
  @Input() ariaLabel = 'Search';

  /** Whether to show Select All (for mat-select[multi=true]) */
  @Input() showToggleAll = true;

  /** select all checkbox checked state */
  @Input() toggleAllCheckboxChecked = false;

  /** select all checkbox indeterminate state */
  @Input() toggleAllCheckboxIndeterminate = false;

  /** Show/Hide the search clear button of the search input */
  @Input() hideClearSearchButton = false;

  /**
   * Always restore selected options on selectionChange for mode multi (e.g. for lazy loading/infinity scrolling).
   * Defaults to false, so selected options are only restored while filtering is active.
   */
  @Input() alwaysRestoreSelectedOptionsMulti = false;

  /** Output emitter to send to parent component with the toggle all boolean */
  @Output() toggleAll = new EventEmitter<ToggleAllType>();

  //#endregion

  //#region [View Child Declarations]
  /** Reference to the search input field */
  @ViewChild('searchSelectInput', { read: ElementRef, static: true })
  searchSelectInput: ElementRef;

  /** Reference to the search input field */
  @ViewChild('innerSelectSearch', { read: ElementRef, static: true })
  innerSelectSearch: ElementRef;

  /** Reference to the multi select element */
  @ViewChild('multiSelectTogglePanel', { read: ElementRef, static: true })
  multiSelectTogglePanel: ElementRef;

  //#endregion

  @HostBinding('class.mat-select-search-inside-mat-option')
  get isInsideMatOption(): boolean {
    return !!this.matOption;
  }

  /** Current search value */
  get value(): string {
    return this._formControl.value;
  }
  private _lastExternalInputValue: string;

  onTouched = (_data: any) => {};

  /** Reference to the MatSelect options */
  public set _options(_options: QueryList<MatOption>) {
    this._options$.next(_options);
  }
  public get _options(): QueryList<MatOption> {
    return this._options$.getValue();
  }
  public _options$: BehaviorSubject<QueryList<MatOption>> = new BehaviorSubject<
    QueryList<MatOption>
  >(null);

  private optionsList$: Observable<MatOption[]> = this._options$.pipe(
    switchMap((_options) =>
      _options
        ? _options.changes.pipe(
            map((options) => options.toArray()),
            startWith<MatOption[]>(_options.toArray())
          )
        : of(null)
    )
  );

  private optionsLength$: Observable<number> = this.optionsList$.pipe(
    map((options) => (options ? options.length : 0))
  );

  /** Previously selected values when using <mat-select [multiple]="true">*/
  private previousSelectedValues: any[];

  private selectedValuesLength = new BehaviorSubject<number>(0);
  public selectedValuesLength$ = this.selectedValuesLength.asObservable();

  public isAllSelected = new BehaviorSubject<boolean>(false);
  public isAllSelected$ = this.isAllSelected.asObservable();

  public _formControl: FormControl = new FormControl('');

  /** whether to show the no entries found message */
  public _showNoEntriesFound$: Observable<boolean> = combineLatest([
    this._formControl.valueChanges,
    this.optionsLength$,
  ]).pipe(
    map(
      ([value, optionsLength]) =>
        this.noEntriesFoundLabel &&
        value &&
        optionsLength === this.getOptionsLengthOffset()
    )
  );

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  /** Mat Select Multiple */
  isMultiSelect: boolean;

  private _initialOptionsLength = 0;

  constructor(
    @Inject(MatSelect) public matSelect: MatSelect,
    public changeDetectorRef: ChangeDetectorRef,
    private _viewportRuler: ViewportRuler,
    @Optional() @Inject(MatOption) public matOption: MatOption = null,
    private liveAnnouncer: LiveAnnouncer,
    @Optional() @Inject(MatFormField) public matFormField: MatFormField = null,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit() {
    // set custom panel class
    const panelClass = 'mat-select-search-panel';
    if (this.matSelect.panelClass) {
      if (Array.isArray(this.matSelect.panelClass)) {
        (<string[]>this.matSelect.panelClass).push(panelClass);
      } else if (typeof this.matSelect.panelClass === 'string') {
        this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
      } else if (typeof this.matSelect.panelClass === 'object') {
        this.matSelect.panelClass[panelClass] = true;
      }
    } else {
      this.matSelect.panelClass = panelClass;
    }

    // set custom mat-option class if the component was placed inside a mat-option
    if (this.matOption) {
      this.matOption.disabled = true;
      this.matOption
        ._getHostElement()
        .classList.add('contains-mat-select-search');
    } else {
      console.error(
        '<zhealthcare-mat-select-search> must be placed inside a <mat-option> element'
      );
    }

    // when the select dropdown panel is opened or closed
    this.matSelect.openedChange
      .pipe(delay(1), takeUntil(this._onDestroy))
      .subscribe((opened) => {
        if (opened) {
          this.updateInputWidth();
          // focus the search field when opening
          if (!this.disableInitialFocus) {
            this._focus();
          }
        } else {
          // clear it when closing
          if (this.clearSearchInput) {
            this._reset();
          }
        }
      });

    // set the first item active after the options changed
    this.matSelect.openedChange
      .pipe(take(1))
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.matSelect._keyManager) {
          this.matSelect._keyManager.change
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.adjustScrollTopToFitActiveOptionIntoView());
        } else {
          console.log('_keyManager was not initialized.');
        }

        this._options = this.matSelect.options;

        // Set Initial Options Length
        this._initialOptionsLength = JSON.parse(
          JSON.stringify(this._options.length - 1)
        );

        // Start : Set Initial Selected Values
        if (
          this._options.toArray().filter((x) => x.selected && !x.disabled) &&
          this._options.toArray().filter((x) => x.selected && !x.disabled) !==
            null
        ) {
          const _length = this._options
            .toArray()
            .filter((x) => x.selected && !x.disabled).length;

          if (_length && _length !== null) {
            this.selectedValuesLength.next(_length);
            if (_length === this._options.length - 1) {
              this.isAllSelected.next(true);
            } else {
              this.isAllSelected.next(false);
            }
          }
        }
        // END : Set Initial Selected Values

        // Closure variable for tracking the most recent first option.
        // In order to avoid avoid causing the list to
        // scroll to the top when options are added to the bottom of
        // the list (eg: infinite scroll), we compare only
        // the changes to the first options to determine if we
        // should set the first item as active.
        // This prevents unnecessary scrolling to the top of the list
        // when options are appended, but allows the first item
        // in the list to be set as active by default when there
        // is no active selection
        let previousFirstOption =
          this._options.toArray()[this.getOptionsLengthOffset()];

        this._options.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
          // avoid "expression has been changed" error
          setTimeout(() => {
            // Convert the QueryList to an array
            const options = this._options.toArray();

            // The true first item is offset by 1
            const currentFirstOption = options[this.getOptionsLengthOffset()];

            const keyManager = this.matSelect._keyManager;
            if (keyManager && this.matSelect.panelOpen) {
              // set first item active and input width

              // Check to see if the first option in these changes is different from the previous.
              const firstOptionIsChanged = !this.matSelect.compareWith(
                previousFirstOption,
                currentFirstOption
              );

              // CASE: The first option is different now.
              // Indiciates we should set it as active and scroll to the top.
              if (
                firstOptionIsChanged ||
                !keyManager.activeItem ||
                !options.find((option) =>
                  this.matSelect.compareWith(option, keyManager.activeItem)
                )
              ) {
                keyManager.setFirstItemActive();
              }

              // wait for panel width changes
              setTimeout(() => {
                this.updateInputWidth();
              });

              if (!this.disableScrollToActiveOnOptionsChanged) {
                this.adjustScrollTopToFitActiveOptionIntoView();
              }
            }

            // Update our reference
            previousFirstOption = currentFirstOption;
          });
        });
      });

    // add or remove css class depending on whether to show the no entries found message
    // note: this is hacky
    this._showNoEntriesFound$
      .pipe(takeUntil(this._onDestroy))
      .subscribe((showNoEntriesFound) => {
        // set no entries found class on mat option
        if (this.matOption) {
          if (showNoEntriesFound) {
            this.matOption
              ._getHostElement()
              .classList.add('mat-select-search-no-entries-found');
          } else {
            this.matOption
              ._getHostElement()
              .classList.remove('mat-select-search-no-entries-found');
          }
        }
      });

    // resize the input width when the viewport is resized, i.e. the trigger width could potentially be resized
    this._viewportRuler
      .change()
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.matSelect.panelOpen) {
          this.updateInputWidth();
        }
      });

    this.initMultipleHandling();

    this.optionsList$.pipe(takeUntil(this._onDestroy)).subscribe((data) => {
      // update view when available options change
      this.changeDetectorRef.markForCheck();
      if (data && data != null && this.isMultiSelect) {
        data.forEach((e) => {
          this.renderer.removeClass(e._getHostElement(), 'mt-52');
        });
        if (data.length >= 1 && data[1] && data[1] !== null) {
          this.renderer.addClass(data[1]._getHostElement(), 'mt-52');
        }

        setTimeout(() => {
          this.setSelectInitials(data);
        });
      }
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  _isToggleVisible(): boolean {
    return this.isMultiSelect && this.showToggleAll;
  }

  /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param event
   */
  _handleKeydown(event: KeyboardEvent) {
    // Prevent propagation for all alphanumeric characters in order to avoid selection issues
    if (
      (event.key && event.key.length === 1) ||
      (event.keyCode >= A && event.keyCode <= Z) ||
      (event.keyCode >= ZERO && event.keyCode <= NINE) ||
      event.keyCode === SPACE ||
      (this.preventHomeEndKeyPropagation &&
        (event.keyCode === HOME || event.keyCode === END))
    ) {
      event.stopPropagation();
    }

    if (this.matSelect.multiple && event.key && event.keyCode === ENTER) {
      // Regain focus after multiselect, so we can further type
      setTimeout(() => this._focus());
    }

    // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
    if (
      this.enableClearOnEscapePressed === true &&
      event.keyCode === ESCAPE &&
      this.value
    ) {
      this._reset(true);
      event.stopPropagation();
    }
  }

  /**
   * Handles the key up event with MatSelect.
   * Allows e.g. the announcing of the currently activeDescendant by screen readers.
   */
  _handleKeyup(event: KeyboardEvent) {
    if (this.isAllSelected.value) {
      this.selectedValuesLength.next(this._initialOptionsLength);
    }

    if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
      const ariaActiveDescendantId = this.matSelect._getAriaActiveDescendant();
      const index = this._options
        .toArray()
        .findIndex((item) => item.id === ariaActiveDescendantId);
      if (index !== -1) {
        const activeDescendant = this._options.toArray()[index];
        this.liveAnnouncer.announce(
          activeDescendant.viewValue +
            ' ' +
            this.getAriaIndex(index) +
            this.indexAndLengthScreenReaderText +
            this.getAriaLength()
        );
      }
    }
  }

  /**
   * Calculate the index of the current option, taking the offset to length into account.
   * examples:
   *    Case 1 [Search, 1, 2, 3] will have offset of 1, due to search and will read index of total.
   *    Case 2 [1, 2, 3] will have offset of 0 and will read index +1 of total.
   */
  getAriaIndex(optionIndex: number): number {
    if (this.getOptionsLengthOffset() === 0) {
      return optionIndex + 1;
    }
    return optionIndex;
  }

  /**
   * Calculate the length of the options, taking the offset to length into account.
   * examples:
   *    Case 1 [Search, 1, 2, 3] will have length of options.length -1, due to search.
   *    Case 2 [1, 2, 3] will have length of options.length.
   */
  getAriaLength(): number {
    return this._options.toArray().length - this.getOptionsLengthOffset();
  }

  writeValue(value: string) {
    this._lastExternalInputValue = value;
    this._formControl.setValue(value);
    this.changeDetectorRef.markForCheck();
  }

  onBlur() {
    // this.onTouched();
  }

  registerOnChange(fn: (value: string) => void) {
    this._formControl.valueChanges
      .pipe(
        filter((value) => value !== this._lastExternalInputValue),
        tap(() => (this._lastExternalInputValue = undefined)),
        takeUntil(this._onDestroy)
      )
      .subscribe(fn);
  }

  registerOnTouched(fn) {
    // this.onTouched = fn;
  }

  _toggleSelectAll($event: boolean) {
    // if ($event) {
    //   this.selectedValuesLength.next(this._initialOptionsLength);
    // }

    const _values = new Array<any>();

    this._options.toArray().forEach((x) => {
      if (x.value && x.value !== null) {
        _values.push(x.value);
      }
    });

    const _value: ToggleAllType = {
      values: $event ? _values : new Array<any>(),
      isSelectedAll: $event,
    };
    this.isAllSelected.next($event);
    this.toggleAll.emit(_value);
  }

  /**
   * Focuses the search input field
   */
  public _focus() {
    if (!this.searchSelectInput || !this.matSelect.panel) {
      return;
    }
    // save and restore scrollTop of panel, since it will be reset by focus()
    // note: this is hacky
    const panel = this.matSelect.panel.nativeElement;
    const scrollTop = panel.scrollTop;

    // focus
    this.searchSelectInput.nativeElement.focus();

    panel.scrollTop = scrollTop;
  }

  /**
   * Resets the current search value
   * @param focus whether to focus after resetting
   */
  public _reset(focus?: boolean) {
    this._formControl.setValue('');
    if (focus) {
      this._focus();
    }
  }

  /**
   * Initializes handling <mat-select [multiple]="true">
   * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
   */
  private initMultipleHandling() {
    this.isMultiSelect = JSON.parse(JSON.stringify(this.matSelect.multiple));

    if (!this.matSelect.ngControl) {
      this.isMultiSelect = JSON.parse(JSON.stringify(this.matSelect.ngControl));
      if (this.matSelect.multiple) {
        // note: the access to matSelect.ngControl (instead of matSelect.value / matSelect.valueChanges)
        // is necessary to properly work in multi-selection mode.
        console.error(
          'the mat-select containing zhealthcare-mat-select-search must have a ngModel or formControl directive when multiple=true'
        );
      }
      return;
    }
    // if <mat-select [multiple]="true">
    // store previously selected values and restore them when they are deselected
    // because the option is not available while we are currently filtering
    this.previousSelectedValues = this.matSelect.ngControl.value;

    this.matSelect.ngControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((values) => {
        let restoreSelectedValues = false;
        if (this.matSelect.multiple) {
          if (
            (this.alwaysRestoreSelectedOptionsMulti ||
              (this._formControl.value && this._formControl.value.length)) &&
            this.previousSelectedValues &&
            Array.isArray(this.previousSelectedValues)
          ) {
            if (!values || !Array.isArray(values)) {
              values = [];
            }
            const optionValues = this.matSelect.options.map(
              (option) => option.value
            );
            this.previousSelectedValues.forEach((previousValue) => {
              if (
                !values.some((v) =>
                  this.matSelect.compareWith(v, previousValue)
                ) &&
                !optionValues.some((v) =>
                  this.matSelect.compareWith(v, previousValue)
                )
              ) {
                // if a value that was selected before is deselected and not found in the options, it was deselected
                // due to the filtering, so we restore it.
                values.push(previousValue);
                restoreSelectedValues = true;
              }
            });
          }
        }

        this.previousSelectedValues = values;

        this.setSelectInitials(this._options?.toArray());

        if (restoreSelectedValues) {
          this.matSelect._onChange(values);
        }
      });
  }

  private setSelectInitials(data: any): void {
    if (data && data !== null) {
      if (
        data.filter((x) => x.selected && !x.disabled) &&
        data.filter((x) => x.selected && !x.disabled) !== null
      ) {
        const _selectedDataLength = this._options
          .toArray()
          .filter((x) => x.selected && !x.disabled).length;

        if (_selectedDataLength && _selectedDataLength !== null) {
          this.selectedValuesLength.next(_selectedDataLength);

          if (_selectedDataLength === data.length - 1) {
            this.isAllSelected.next(true);
          } else {
            this.isAllSelected.next(false);
          }
        } else {
          this.selectedValuesLength.next(0);
          this.isAllSelected.next(false);
        }
      } else {
        this.selectedValuesLength.next(0);
        this.isAllSelected.next(false);
      }
    }
  }

  /**
   * Scrolls the currently active option into the view if it is not yet visible.
   */
  private adjustScrollTopToFitActiveOptionIntoView(): void {
    if (this.matSelect.panel && this.matSelect.options.length > 0) {
      const matOptionHeight = this.getMatOptionHeight();
      const activeOptionIndex = this.matSelect._keyManager.activeItemIndex || 0;
      const labelCount = _countGroupLabelsBeforeOption(
        activeOptionIndex,
        this.matSelect.options,
        this.matSelect.optionGroups
      );
      // If the component is in a MatOption, the activeItemIndex will be offset by one.
      const indexOfOptionToFitIntoView =
        (this.matOption ? -1 : 0) + labelCount + activeOptionIndex;
      const currentScrollTop = this.matSelect.panel.nativeElement.scrollTop;

      const searchInputHeight =
        this.innerSelectSearch.nativeElement.offsetHeight;
      const amountOfVisibleOptions = Math.floor(
        (SELECT_PANEL_MAX_HEIGHT - searchInputHeight) / matOptionHeight
      );

      const indexOfFirstVisibleOption =
        Math.round((currentScrollTop + searchInputHeight) / matOptionHeight) -
        1;

      if (indexOfFirstVisibleOption >= indexOfOptionToFitIntoView) {
        this.matSelect.panel.nativeElement.scrollTop =
          indexOfOptionToFitIntoView * matOptionHeight;
      } else if (
        indexOfFirstVisibleOption + amountOfVisibleOptions <=
        indexOfOptionToFitIntoView
      ) {
        this.matSelect.panel.nativeElement.scrollTop =
          (indexOfOptionToFitIntoView + 1) * matOptionHeight -
          (SELECT_PANEL_MAX_HEIGHT - searchInputHeight);
      }
    }
  }

  /**
   *  Set the width of the innerSelectSearch to fit even custom scrollbars
   *  And support all Operation Systems
   */
  public updateInputWidth() {
    if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
      return;
    }
    let element: HTMLElement = this.innerSelectSearch.nativeElement;
    let panelElement: HTMLElement;
    while ((element = element.parentElement)) {
      if (element.classList.contains('mat-select-panel')) {
        panelElement = element;
        break;
      }
    }
    if (panelElement) {
      this.innerSelectSearch.nativeElement.style.width =
        panelElement.clientWidth + 'px';
      this.multiSelectTogglePanel.nativeElement.style.width =
        panelElement.clientWidth + 'px';
    }
  }

  private getMatOptionHeight(): number {
    if (this.matSelect.options.length > 0) {
      return this.matSelect.options.first
        ._getHostElement()
        .getBoundingClientRect().height;
    }

    return 0;
  }

  /**
   * Determine the offset to length that can be caused by the optional matOption used as a search input.
   */
  private getOptionsLengthOffset(): number {
    if (this.matOption) {
      return 1;
    } else {
      return 0;
    }
  }
}
