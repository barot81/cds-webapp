import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import * as jsonLogic from 'json-logic-js';

import { HttpConstants, MetaConstants } from '@zhealthcare/fusion/core';
import { FeatureFlagDataService } from './feature-flag-data.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private _featureFlags: Record<
    string,
    { value: string; description: string }
  > = {};
  private _initialized = false;

  constructor(private featureFlagDataService: FeatureFlagDataService) {}

  async initialize() {
    if (!this._initialized) {
      this._featureFlags =
        (await lastValueFrom(
          this.featureFlagDataService.getFeatureFlags(
            JSON.parse(<any>localStorage.getItem(MetaConstants.SELECTED_TENANT))
              ?.tenantId ?? HttpConstants.BASE
          )
        )) ?? {};
      this._initialized = true;
    }
  }

  async getFeatureFlags() {
    await this.initialize();
    return this._featureFlags;
  }

  async featureOff(rules: jsonLogic.RulesLogic) {
    return !(await this.featureOn(rules));
  }

  async featureOn(rules: jsonLogic.RulesLogic) {
    return this.applyRules(rules);
  }

  async applyRules(rules: jsonLogic.RulesLogic) {
    const featureFlag = await this.getFeatureFlags();
    return jsonLogic.apply(rules, featureFlag);
  }

  resetFeatureFlags() {
    this._initialized = false;
    this._featureFlags = {};
  }
}
