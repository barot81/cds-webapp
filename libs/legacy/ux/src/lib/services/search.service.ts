import { Injectable } from '@angular/core';

@Injectable({providedIn: 'any'})
export class SearchService {
    constructor() { }
    
  searchByKeys(items: any[], searchText: string, columns: any): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

    const result = items.filter(obj => {
      return Object.keys(obj).reduce((acc, curr) => {
        return acc || typeof obj[curr] === "string" && columns.includes(curr) && obj[curr].toLowerCase().trim().includes(searchText);
      }, false);
    });
    return result;
  }
}