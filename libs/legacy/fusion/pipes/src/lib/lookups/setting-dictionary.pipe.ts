import { Pipe, PipeTransform } from '@angular/core';
import { GlobalVariable } from '@exxat/fusion/core';

@Pipe({
  name: 'labelDictionary',
})
export class LabelDictionaryPipe implements PipeTransform {
  transform(label: string, alias: string): string {
    const aliasExists = GlobalVariable.settingDictionary.get(alias);
    if (label && aliasExists) {
      label = GlobalVariable.settingDictionary.get(alias)?.value;
    }
    return label;
  }
}
