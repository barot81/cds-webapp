import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface WishlistArray {
  id: string,
  title: string;
  setting?: string;
  address?: string;
  message?: string;
  errorMessage?: string;
}
@Component({
  selector: 'ryzen-add-edit-wishlist',
  templateUrl: './add-edit-wishlist.component.html',
})
export class AddEditWishlistComponent implements OnInit {

  wislistItems: Array<WishlistArray> = [{ id: '1', title: 'Accel physical therapy', setting: 'Home health', address: '500 Nathan dean blvd,Suite 108 Rt, Dallas, Georgia 30132, United States' },
  { id: '2', title: 'Residences of thomas circle', address: '500 Nathan dean blvd,Suite 108 Rt, Dallas, Georgia 30132, United States' },
  { id: '3', title: 'Applecrest medical center', address: '500 Nathan dean blvd,Suite 108 Rt, Dallas, Georgia 30132, United States', message: 'Reason for prefering this site?' },
  { id: '4', title: 'Mayo clinic', address: '500 Nathan dean blvd,Suite 108 Rt, Dallas, Georgia 30132, United States', errorMessage: 'This slot is not more available' }
  ];
  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<WishlistArray[]>) {
    moveItemInArray(this.wislistItems = this.wislistItems.slice(), event.previousIndex, event.currentIndex);
  }

}
