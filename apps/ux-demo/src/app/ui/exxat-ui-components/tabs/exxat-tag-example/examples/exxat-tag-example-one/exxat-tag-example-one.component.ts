/* eslint-disable @angular-eslint/component-selector */
import { Component, Output, EventEmitter } from '@angular/core';
import { ExxatTag, ExxatTagOptions, TagEvent } from '@exxat/plugin/tags';


@Component({
  selector: 'exxat-app-exxat-tag-example-one',
  templateUrl: './exxat-tag-example-one.component.html',
  styleUrls: ['./exxat-tag-example-one.component.scss']
})
export class ExxatTagExampleOneComponent {
  public tagOptions = new ExxatTagOptions();

  tags: Array<ExxatTag> = [
    {
      id: Math.random(),
      name: 'Tag with 30 characters allowed',
      color: 'indigo-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag label 71 lorem ipsum',
      color: 'deep-orange-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag label 23 lorem',
      color: 'pink-500',
      isChecked: false
    },
    {
      id: Math.random(),
      name: 'Tag label 532',
      color: 'blue-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag with 82 lorem ipsum do',
      color: 'gray-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag label 892',
      color: 'purple-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag label 7  lorem',
      color: 'yellow-500',
      isChecked: true
    },
    {
      id: Math.random(),
      name: 'Tag with 82 lorem ipsum do',
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

  @Output() menuOpened: EventEmitter<void>;

  openTagswithoutButtons() {
    this.tagOptions = {
      saveButton: false,
      tagTitleMaxLength: 30,
      tagsListLength: 7
    };
  }

  onTagChanges(event: TagEvent) {
    if (event.eventType.toLowerCase() === 'change') {
      this.tags = new Array<ExxatTag>();
      Object.assign(this.tags, event.tags);
      this.selectedtagsCount = this.tags.filter(
        (val) => val.isChecked === true
      ).length;
    }
  }
}

