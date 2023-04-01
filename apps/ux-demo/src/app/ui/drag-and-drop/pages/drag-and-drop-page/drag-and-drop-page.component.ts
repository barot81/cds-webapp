import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'exxat-drag-and-drop-page',
  templateUrl: './drag-and-drop-page.component.html',
})
export class DragAndDropPageComponent {
  columnsList = [
    'Course Objective 1',
    "Now you can browse privately, and other people who use this device won't see your activity. However, downloads, bookmarks and reading list items will be saved.",
    'Course Objective 4',
    'Course Objective 5',
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    'Time',
    "Now you can browse privately, and other people who use this device won't see your activity. However, downloads, bookmarks and reading list items will be saved.",
  ];

  tooltipOptions = {
    contentType: 'string',
    placement: 'bottom',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto',
  };

  editColumnsForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.editColumnsForm = this._formBuilder.group({
      columnControl: [this.columnsList[0]],
    });
  }

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.offsetHeight < elem.scrollHeight;
    } else {
      return false;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsList, event.previousIndex, event.currentIndex);
  }
}
