import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ExxatTag, ExxatTagOptions } from '@exxat/plugin/tags';

@Component({
  selector: 'exxat-app-exxat-tag-example-two',
  templateUrl: './exxat-tag-example-two.component.html',
  styleUrls: ['./exxat-tag-example-two.component.scss']
})
export class ExxatTagExampleTwoComponent {
  public tagOptions = new ExxatTagOptions();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  @Output() menuOpened: EventEmitter<void>;

  tags: Array<ExxatTag> = [
    {
      id: Math.random(),
      name: 'Tag with 30 characters allowed',
      color: 'indigo-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 2',
      color: 'deep-orange-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 3',
      color: 'pink-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 4 Bigger Text',
      color: 'blue-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 5',
      color: 'gray-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 6',
      color: 'purple-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 7 Bigger Text',
      color: 'yellow-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag Label 8',
      color: 'green-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 9',
      color: 'pink-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag Label 10 Bigger Text',
      color: 'indigo-500',
      isChecked: true
    }
  ];

  public selectedtagsCount: number = this.tags.filter(
    (val) => val.isChecked === true
  ).length;

  tagsCopy = JSON.parse(JSON.stringify(this.tags));

  openTagswithButtons() {
    this.tagOptions = {
      saveButton: true,
      tagTitleMaxLength: 30,
      tagsListLength: 10
    };
  }

  tagsChanged($event: any) {
    if (
      this.tagOptions.saveButton &&
      $event.eventType.toLowerCase() === 'change'
    ) {
      this.tagsCopy = JSON.parse(JSON.stringify($event.tags));
      this.selectedtagsCount = this.tags.filter(
        (val) => val.isChecked === true
      ).length;
      this.trigger.closeMenu();
    } else if ($event.eventType == 'Add') {
      this.tagsCopy.push(JSON.parse(JSON.stringify($event.tags)));
      this.selectedtagsCount = this.tags.filter(
        (val) => val.isChecked === true
      ).length;
    }
  }
}
