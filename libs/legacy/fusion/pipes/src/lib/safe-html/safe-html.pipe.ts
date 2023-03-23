import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import * as DOMPurify from 'dompurify';

@Pipe({
    name: 'safeHTML'
})
export class SafeHTMLPipe implements PipeTransform{

    constructor(private sanitizer:DomSanitizer){}

    transform(html) {
        if(html){
            html = DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
        return html;
    }
}
