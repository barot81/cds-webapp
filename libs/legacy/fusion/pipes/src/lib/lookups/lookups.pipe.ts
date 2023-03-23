import { Pipe, PipeTransform } from '@angular/core';
import {  Lookup, LookupItem } from '@exxat/fusion/models';
import { FeatureMetadataService } from '@exxat/fusion/services';

@Pipe({
  name: 'lookups'
})
export class LookUpsPipe implements PipeTransform {
  lookupData: Lookup;
  constructor(private readonly featureMetadataService: FeatureMetadataService) {}

  transform(key: string): LookupItem[] {
    this.lookupData = JSON.parse(localStorage.getItem(this.featureMetadataService.lookupPrefix + key?.toLowerCase()));

    if (this.lookupData === undefined || this.lookupData === null) {
      return [];
      }
      return this.lookupData?.items;

  }
}
