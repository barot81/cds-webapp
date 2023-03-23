import { FormValidationAPIClient } from './form-validation/form.validation.APIClient';
import { Injectable } from '@angular/core';
import { LookupAPIClient } from './lookup/lookup.APIClient';
import { map } from 'rxjs/operators';
import {
  Lookup,
  LookupMap,
  SettingsMap,
  Validations,
} from '@zhealthcare/fusion/models';
import { Sandbox, OrgFacade, FoundationInjector } from '@zhealthcare/fusion/core';
import { Observable } from 'rxjs';
import { KeywordAPIClient } from './keyword-dictionary/keyword.APIClient';

@Injectable({
  providedIn: 'root'
})
export class FeatureMetadataService extends Sandbox {
  lookupAPIClient: LookupAPIClient;
  keywordAPIClient: KeywordAPIClient;
  formValidationAPIClient: FormValidationAPIClient;
  orgFacade: OrgFacade;
  serviceCode: string;
  oucodeName: any;
  public lookupPrefix: string;
  public settingPrefix: string;
  constructor() {
    super();
    this.lookupAPIClient = new LookupAPIClient();
    this.keywordAPIClient = new KeywordAPIClient();
    this.formValidationAPIClient = new FormValidationAPIClient();
    this.orgFacade = FoundationInjector.get(OrgFacade);
  }

  initialize(serviceCode: string, serviceEndpoint: string) {
    this.lookupAPIClient.serviceName = serviceEndpoint;
    this.keywordAPIClient.serviceName = serviceEndpoint;
    this.formValidationAPIClient.serviceName = serviceEndpoint;

    this.serviceCode = serviceCode;
    this.orgFacade.selectedOucode$
      .pipe(
        map((x) => {
          if (x !== undefined && x !== null) {
            this.oucodeName = x.Name;
            this.lookupPrefix = `${this.serviceCode}.${this.oucodeName}.Lookup.`;
            this.settingPrefix = `${this.serviceCode}.${this.oucodeName}.Settings`;
          }
        })
      )
      .subscribe();
  }

  ////////////////////////////////////////////////
  // Lookups

  getLookupList(): Observable<LookupMap> {
    return this.lookupAPIClient.getLookupList(this.oucodeName).pipe(
      map((data) => {
        data.lookups.foreach((value: boolean, key: string) => {
          localStorage.setItem(
            this.lookupPrefix + key.toLowerCase(),
            JSON.stringify(value)
          );
        });
        return data;
      })
    );
  }

  getLookupByNameAndTag(name: string, tag: string): Observable<Lookup> {
    return this.lookupAPIClient
      .getLookupByNameAndTag(
        name.toLowerCase(),
        tag.toLowerCase(),
        this.oucodeName
      )
      .pipe(
        map((data) => {
          localStorage.setItem(
            this.lookupPrefix + name.toLowerCase(),
            JSON.stringify(data)
          );
          return data;
        })
      );
  }

  getLookupByName(name: string): Observable<Lookup> {
    return this.lookupAPIClient
      .getLookupByName(name.toLowerCase(), this.oucodeName)
      .pipe(
        map((data) => {
          localStorage.setItem(
            this.lookupPrefix + name.toLowerCase(),
            JSON.stringify(data)
          );
          return data;
        })
      );
  }

  ////////////////////////////////////////
  // Data Dictionary

  getKeywordDictionary(): Observable<SettingsMap> {
    return this.keywordAPIClient.getKeywordDictionary(this.oucodeName).pipe(
      map((data) => {
        localStorage.setItem(this.settingPrefix, JSON.stringify(data));
        return data;
      })
    );
  }

  //////////////////////////////////////////////
  // Form Validaotrs

  getFormValidatorJson(validationId: string): Observable<Validations> {
    return this.formValidationAPIClient.getValidationJson(validationId).pipe(
      map((data) => {
        localStorage.setItem(validationId, JSON.stringify(data));
        return data;
      })
    );
  }
}
