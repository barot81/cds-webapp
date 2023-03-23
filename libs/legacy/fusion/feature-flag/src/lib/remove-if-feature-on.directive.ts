import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { RulesLogic } from 'json-logic-js';

import { FeatureFlagService } from './feature-flag.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[RemoveIfFeatureOn]',
})
export class RemoveIfFeatureOnDirective implements OnInit {
  @Input('RemoveIfFeatureOn') rules!: RulesLogic;

  constructor(
    private el: ElementRef,
    private featureFlagService: FeatureFlagService
  ) {}

  async ngOnInit() {
    if (await this.featureFlagService.featureOn(this.rules)) {
      this.el.nativeElement.parentNode.removeChild(this.el.nativeElement);
    }
  }
}
