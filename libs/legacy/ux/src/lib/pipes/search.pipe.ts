import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "search"
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase().trim();

        const result = items.filter(obj => {
            return obj.toLowerCase().trim().includes(searchText);
        //     return obj.toLowerCase()..trim().replace(/\s/g, "").includes(searchText);
        });
        return result;
    }
}

