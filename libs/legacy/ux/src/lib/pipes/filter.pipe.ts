import { Pipe, PipeTransform } from '@angular/core';
import { FuseUtils } from '../utils';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform
{
    /**
     * Transform
     *
     */
    transform(mainArr: any[], searchText: string, property: string): any
    {
        return FuseUtils.filterArrayByString(mainArr, searchText);
    }
}
