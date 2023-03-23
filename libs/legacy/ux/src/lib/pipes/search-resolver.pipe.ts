import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchResolver"
})
export class SearchResolverPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase().trim();

    const result = items.filter(obj => {
      return Object.keys(obj).reduce((acc, curr) => {
        return acc || typeof obj[curr] === "string" && obj[curr].toLowerCase().trim().includes(searchText);
      }, false);
    });
    return result;
  }
}
