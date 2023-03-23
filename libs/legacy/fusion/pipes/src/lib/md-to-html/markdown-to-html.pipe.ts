import { Pipe, PipeTransform } from "@angular/core";
import * as marked from "marked";
import * as DOMPurify from 'dompurify';

@Pipe({
    name: 'mdToHTML'
})
export class MarkdownPipe implements PipeTransform{

    constructor(){}

    transform(data) {
        if(data){
            let markedData = marked.parse(data);
            return DOMPurify.sanitize(markedData, { ADD_ATTR: ['target'] }); //Sanitize html
        }
        return data;
    }
}
