import { Pipe, PipeTransform } from '@angular/core';
import {  SettingsMap, SettingItem } from '@exxat/fusion/models';
import { FeatureMetadataService } from '@exxat/fusion/services';

@Pipe({
  name: 'keyword'
})
export class KeywordDictionaryPipe implements PipeTransform {
  settingData: SettingsMap;
  constructor(private readonly featureMetadataService: FeatureMetadataService) {}

  transform(key: string, defaultValue: string): string {
    this.settingData = JSON.parse(localStorage.getItem(this.featureMetadataService.settingPrefix));

    if (this.settingData === undefined || this.settingData === null) {
      this.featureMetadataService.getKeywordDictionary().subscribe(settingsDictionary => {
        this.settingData = settingsDictionary.settings;
      });
    }
    if(this.settingData == null || this.settingData[key] == null)
    {
      return defaultValue;
    }

      return this.settingData[key].value;
  }
}
