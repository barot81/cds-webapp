/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/no-output-native */
/* eslint-disable @angular-eslint/component-selector */
/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
  Component,
  Input,
  Output,
  NgZone,
  EventEmitter,
  forwardRef,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';
import * as marked from 'marked';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as DOMPurify from 'dompurify';

import { CKEditor5 } from './ckeditor';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ckeditor',
  template: `
    <ng-template></ng-template>
    <div class="word-count-container" *ngIf="maxLength && maxLength !== null">
      <span
        >{{
          getTextLengthInfo()
        }}
        </span
      >
    </div>
  `,

  // Integration with @angular/forms.
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => CKEditorComponent),
      multi: true
    }
  ]
})
export class CKEditorComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  /**
   * The reference to the DOM element created by the component.
   */
  private elementRef!: ElementRef<HTMLElement>;

  /**
   * The constructor of the editor to be used for the instance of the component.
   * It can be e.g. the `ClassicEditorBuild`, `InlineEditorBuild` or some custom editor.
   */
  @Input() public editor?: CKEditor5.EditorConstructor;

  /**
   * The Maxlength configuration
   */
  @Input() public maxLength?: number;

  /**
   * The configuration of the editor.
   * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
   * to learn more.
   */
  @Input() public config: CKEditor5.Config = {};

  /**
   * The initial data of the editor. Useful when not using the ngModel.
   * See https://angular.io/api/forms/NgModel to learn more.
   */
  @Input() public data = '';

  /**
   * Tag name of the editor component.
   *
   * The default tag is 'div'.
   */
  @Input() public tagName = 'div';

  /**
   * When set `true`, the editor becomes read-only.
   * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
   * to learn more.
   */
  @Input() public set disabled(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }

  public get disabled() {
    if (this.editorInstance) {
      return this.editorInstance.isReadOnly;
    }

    return this.initialIsDisabled;
  }

  /**
   * Fires when the editor is ready. It corresponds with the `editor#ready`
   * https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#event-ready
   * event.
   */
  @Output() public ready = new EventEmitter<CKEditor5.Editor>();

  /**
   * Fires when the editor is valid or invalid based on the maxLength. It corresponds with the `editor#maxLength`
   */
  @Output() public onValidate = new EventEmitter<boolean>();

  /**
   * Fires when the content of the editor has changed. It corresponds with the `editor.model.document#change`
   * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_document-Document.html#event-change
   * event.
   */
  @Output() public change: EventEmitter<ChangeEvent> = new EventEmitter<
    ChangeEvent
  >();

  /**
   * Fires when the editing view of the editor is blurred. It corresponds with the `editor.editing.view.document#blur`
   * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:blur
   * event.
   */
  @Output() public blur: EventEmitter<BlurEvent> = new EventEmitter<
    BlurEvent
  >();

  /**
   * Fires when the editing view of the editor is focused. It corresponds with the `editor.editing.view.document#focus`
   * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:focus
   * event.
   */
  @Output() public focus: EventEmitter<FocusEvent> = new EventEmitter<
    FocusEvent
  >();

  /**
   * The instance of the editor created by this component.
   */
  public editorInstance: CKEditor5.Editor | null = null;

  /**
   * If the component is read–only before the editor instance is created, it remembers that state,
   * so the editor can become read–only once it is ready.
   */
  private initialIsDisabled = false;

  /**
   * An instance of https://angular.io/api/core/NgZone to allow the interaction with the editor
   * withing the Angular event loop.
   */
  private ngZone: NgZone;

  /**
   * A callback executed when the content of the editor changes. Part of the
   * `ControlValueAccessor` (https://angular.io/api/forms/ControlValueAccessor) interface.
   *
   * Note: Unset unless the component uses the `ngModel`.
   */
  private cvaOnChange?: (data: string) => void;

  /**
   * A callback executed when the editor has been blurred. Part of the
   * `ControlValueAccessor` (https://angular.io/api/forms/ControlValueAccessor) interface.
   *
   * Note: Unset unless the component uses the `ngModel`.
   */
  private cvaOnTouched?: () => void;

  /**
   * Reference to the source element used by the editor.
   */
  private editorElement?: HTMLElement;

  /**
   * A lock flag preventing from calling the `cvaOnChange()` during setting editor data.
   */
  private isEditorSettingData = false;

  /**
   * Word Count Configuration Variables
   */

  private inValidStyleClass = 'inValid';
  private validStyleClass = 'valid';
  private charCount = new BehaviorSubject<number>(0);
  public charCount$ = this.charCount.asObservable();

  public constructor(
    elementRef: ElementRef,
    ngZone: NgZone,
    private readonly renderer: Renderer2
  ) {
    this.ngZone = ngZone;
    this.elementRef = elementRef;
  }

  public ngOnInit() { }
  // Implementing the AfterViewInit interface.
  public ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.createEditor();
    });
  }

  // Implementing the OnDestroy interface.
  public ngOnDestroy() {
    if (this.editorInstance) {
      this.editorInstance.destroy();
      this.editorInstance = null;
    }
  }

  // Implementing the ControlValueAccessor interface (only when binding to ngModel).
  public writeValue(value: string | null): void {
    // This method is called with the `null` value when the form resets.
    // A component's responsibility is to restore to the initial state.
    if (value === null) {
      value = '';
    }

    //checks value has html tags or not
    if (value && value.length > 0) {
      // && !(/<\/?[a-z][\s\S]*>/i.test(value))
      value = marked.parse(value);
      value = DOMPurify.sanitize(value); //sanitize the HTML to prevent XSS attacks
    }

    // If already initialized.
    if (this.editorInstance) {
      // The lock mechanism prevents from calling `cvaOnChange()` during changing
      // the editor state. See #139
      this.isEditorSettingData = true;
      this.editorInstance.setData(value);
      this.isEditorSettingData = false;
    }
    // If not, wait for it to be ready; store the data.
    else {
      this.data = value;

      // If the editor element is already available, then update its content.
      // If the ngModel is used then the editor element should be updated directly here.
      if (this.editorElement) {
        this.editorElement.innerHTML = this.data;
      }
    }
  }

  // Implementing the ControlValueAccessor interface (only when binding to ngModel).
  public registerOnChange(callback: (data: string) => void): void {
    this.cvaOnChange = callback;
  }

  // Implementing the ControlValueAccessor interface (only when binding to ngModel).
  public registerOnTouched(callback: () => void): void {
    this.cvaOnTouched = callback;
  }

  // Implementing the ControlValueAccessor interface (only when binding to ngModel).
  public setDisabledState(isDisabled: boolean): void {
    // If already initialized
    if (this.editorInstance) {
      this.editorInstance.isReadOnly = isDisabled;
    }
    // If not, wait for it to be ready; store the state.
    else {
      this.initialIsDisabled = isDisabled;
    }
  }

  /**
   * Creates the editor instance, sets initial editor data, then integrates
   * the editor with the Angular component. This method does not use the `editor.setData()`
   * because of the issue in the collaboration mode (#6).
   */
  private async createEditor(): Promise<void> {
    const element = document.createElement(this.tagName);
    this.editorElement = element;

    if (this.data && this.config.initialData) {
      throw new Error(
        'Editor data should be provided either using `config.initialData` or `data` properties.'
      );
    }

    // Merge two possible ways of providing data into the `config.initialData` field.
    const config = {
      ...this.config,
      initialData: this.config.initialData || this.data || ''
    };

    if (this.maxLength && isNumber(this.maxLength)) {
      config['wordCount'] = {
        onUpdate: stats => {
          this.charCount.next(stats.characters);
          this.wordCountHandler(this.charCount.value);
        }
      };
    }

    this.elementRef.nativeElement.appendChild(element);

    return this.editor!.create(element, config)
      .then(editor => {
        this.editorInstance = editor;

        if (this.initialIsDisabled) {
          editor.isReadOnly = this.initialIsDisabled;
        }

        this.ngZone.run(() => {
          this.ready.emit(editor);
        });

        this.setUpEditorEvents(editor);
      })
      .catch((err: Error) => {
        console.error(err.stack);
      });
  }

  /**
   * Max Length Validation
   */

  private wordCountHandler(charCount: number) {
    if (this.editorInstance && this.editorInstance != null) {
      const uiElement = (<Element>this.editorInstance['ui']['view']['element'])
        .parentElement as HTMLElement;

      this.removeStyleClass(uiElement, this.inValidStyleClass);
      this.removeStyleClass(uiElement, this.validStyleClass);
    }

    if (charCount >= 0 && charCount <= this.maxLength) {
      this.onValidate.emit(true);
      if (charCount > 0) {
        this.toggleStyleClasses(true);
      }
    } else {
      this.toggleStyleClasses(false);
      this.onValidate.emit(false);
    }
  }

  private toggleStyleClasses(isValid: boolean) {
    if (this.editorInstance && this.editorInstance != null) {
      const uiElement = (<Element>this.editorInstance['ui']['view']['element'])
        .parentElement as HTMLElement;

      if (isValid) {
        this.removeStyleClass(uiElement, this.inValidStyleClass);

        this.addStyleClass(uiElement, this.validStyleClass);
      } else {
        this.removeStyleClass(uiElement, this.validStyleClass);

        this.addStyleClass(uiElement, this.inValidStyleClass);
      }
    }
  }

  private addStyleClass(element: Element, className: string) {
    this.renderer.addClass(element, className);
  }

  private removeStyleClass(element: Element, className: string) {
    this.renderer.removeClass(element, className);
  }

  public getTextLengthInfo(): string {
    if (this.maxLength - this.charCount.value >= 0) {
      return `${this.maxLength - this.charCount.value} characters left`;
    }
    else {
      return `${Math.abs(this.maxLength - this.charCount.value)} characters over`
    }
  }

  /**
   * Integrates the editor with the component by attaching related event listeners.
   */
  private setUpEditorEvents(editor: CKEditor5.Editor): void {
    const modelDocument = editor.model.document;
    const viewDocument = editor.editing.view.document;

    modelDocument.on(
      'change:data',
      (evt: CKEditor5.EventInfo<'change:data'>) => {
        this.ngZone.run(() => {
          if (this.cvaOnChange && !this.isEditorSettingData) {
            const data = editor.getData();

            this.cvaOnChange(data);
          }

          this.change.emit({ event: evt, editor });
        });
      }
    );

    viewDocument.on('focus', (evt: CKEditor5.EventInfo<'focus'>) => {
      this.ngZone.run(() => {
        this.focus.emit({ event: evt, editor });
      });
    });

    viewDocument.on('blur', (evt: CKEditor5.EventInfo<'blur'>) => {
      this.ngZone.run(() => {
        if (this.cvaOnTouched) {
          this.cvaOnTouched();
        }

        this.blur.emit({ event: evt, editor });
      });
    });
  }
}

export interface BlurEvent {
  event: CKEditor5.EventInfo<'blur'>;
  editor: CKEditor5.Editor;
}

export interface FocusEvent {
  event: CKEditor5.EventInfo<'focus'>;
  editor: CKEditor5.Editor;
}

export interface ChangeEvent {
  event: CKEditor5.EventInfo<'change:data'>;
  editor: CKEditor5.Editor;
}

function isNumber(value: string | number): boolean {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
}
