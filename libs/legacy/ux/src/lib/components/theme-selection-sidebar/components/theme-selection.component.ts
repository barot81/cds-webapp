import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FusionConfigService } from '@exxat/fusion/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type ThemeOption = 'theme-blue' | 'theme-purple' | string;

export type SchemeOption = 'light' | 'dark';

@Component({
  selector: 'exxat-theme-selection',
  templateUrl: './theme-selection.component.html',
})
export class ThemeSelectionComponent implements OnInit, OnDestroy {
  // Private
  private _unsubscribeAll: Subject<any>;

  selectedColorTheme: string;

  themes = [
    {
      id: 'theme-blue',
      title: 'Default',
      primary: '#3f51b5',
    },
    {
      id: 'theme-purple',
      title: 'Purple',
      primary: '#9333ea',
    },
  ];

  schemes = [
    {
      id: 'light',
      icon: 'fa-sun',
    },
    {
      id: 'dark',
      icon: 'fa-moon',
    },
  ];

  private selectedTheme = new BehaviorSubject<ThemeOption>('theme-blue');
  public selectedTheme$ = this.selectedTheme.asObservable();

  private selectedScheme = new BehaviorSubject<SchemeOption>('light');
  public selectedScheme$ = this.selectedScheme.asObservable();

  fuseConfig: any;
  form: FormGroup;

  /**
   *
   */
  constructor(
    private _fusionConfigService: FusionConfigService,
    private _formBuilder: FormBuilder
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      colorTheme: new FormControl(),
    });

    // Subscribe to the config changes
    this._fusionConfigService.uiSettings
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        // Update the stored config
        this.fuseConfig = config;

        if (
          this.fuseConfig?.colorTheme &&
          this.fuseConfig?.colorTheme !== null
        ) {
          let splitted = this.fuseConfig?.colorTheme.split('-', 3);
          if (splitted && splitted !== null && splitted.length > 0) {
            this.selectedTheme.next(splitted[0] + '-' + splitted[1]);
            this.selectedScheme.next(splitted[2]);
          }
        }

        // Set the config form values without emitting an event
        // so that we don't end up with an infinite loop

        this.form.setValue(config, { emitEvent: false });
      });

    // Subscribe to the form value changes
    this.form.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        // Update the config
        this._fusionConfigService.uiSettings = config;
      });

    this.selectedTheme$.subscribe((value) => {
      if (value && value !== null) {
        this.setSelectedColorTheme();
      }
    });

    this.selectedScheme$.subscribe((value) => {
      if (value && value !== null) {
        this.setSelectedColorTheme();
      }
    });
  }

  setSelectedColorTheme() {
    this.selectedColorTheme =
      this.selectedTheme.value + '-' + this.selectedScheme.value;

    this.form.get('colorTheme').patchValue(this.selectedColorTheme);
  }

  changeTheme(theme: ThemeOption): void {
    if (theme && theme !== null) {
      this.selectedTheme.next(theme);
    }
  }

  changeScheme(scheme: SchemeOption): void {
    if (scheme && scheme !== null) {
      this.selectedScheme.next(scheme);
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
