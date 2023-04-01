/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'ryzen-chips-selection-form',
  templateUrl: './chips-selection-form.component.html',
  styleUrls: ['./chips-selection-form.component.scss'],
})
export class ChipsSelectionFormComponent {
  
  items: any = [
  {
    colorClass: "zhealthcare-tall-poppy-bg",
    colorCode: "#BF342A",
    id:"Apple",
    name: "Apple"
  },
  {
    colorClass: "zhealthcare-silver-chalice-dark-bg",
    colorCode: "#9E9E9E",
    id:"Mango",
    name: "Mango"
  },
  {
    colorClass: "zhealthcare-orange-peel-bg",
    colorCode: "#FF9800",
    id:"Grapes",
    name: "Grapes"
  },
  {
    colorClass: "zhealthcare-picasso-bg",
    colorCode: "#FFF59E",
    id:"Banana",
    name: "Banana"
  },
  {
    colorClass: "zhealthcare-mandy-bg",
    colorCode: "#E85D67",
    id:"Kiwi",
    name: "Kiwi"
  },
  {
    colorClass: "zhealthcare-san-marino-bg",
    colorCode: "#3F51B5",
    id:"Strawberry",
    name: "Strawberry"
  },
  ]

  selectedItems: any = [];
  removable = true;
  selectable = true;

 remove(item): void {
    const index = this.selectedItems.indexOf(item);
    this.selectedItems.splice(index, 1);
    this.items.push(item)
 }

  addItem(item) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.selectedItems.push(item)
  }

}
