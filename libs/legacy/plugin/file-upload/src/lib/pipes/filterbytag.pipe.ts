import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'filterBytag'
})
export class FilterByTagPipe implements PipeTransform{
   
    transform(fileDescriptions: any,tag:string) {
        if(tag == undefined || tag== null || tag=="")
            return fileDescriptions;
        return fileDescriptions.filter(x=>x.description == tag);
    }

}