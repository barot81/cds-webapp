import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'htmlToPlaintext'})
export class HtmlToPlaintextPipe implements PipeTransform
{
    /**
     * Transform
     *
     */
    transform(value: string, args: any[] = []): string
    {
        return value ? String(value).replace(/<[^>]+>/gm, '') : '';
    }
}
