import { A11yModule } from '@angular/cdk/a11y';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  TooltipDirective,
  ClickOutsideDirective
} from '../directives';
import { ViewService, FocusHelper } from '../services';
import { TIPPY_CONFIG, TippyConfig } from '../utils';

@NgModule({
  imports: [A11yModule],
  declarations: [
    TooltipDirective,
    ClickOutsideDirective
  ],
  providers: [ViewService, FocusHelper],
  exports: [TooltipDirective, ClickOutsideDirective],
})
export class zhealthcareTooltipModule {
  static forRoot(
    config: Partial<TippyConfig> = {}
  ): ModuleWithProviders<zhealthcareTooltipModule> {
    return {
      ngModule: zhealthcareTooltipModule,
      providers: [
        {
          provide: TIPPY_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
