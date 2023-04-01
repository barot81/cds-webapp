import { Component, ElementRef, ViewChild ,EventEmitter,Output, AfterViewInit} from '@angular/core';
import { CarouselEvent } from '@exxat/ux';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

import { MatMenuTrigger } from '@angular/material/menu';
import { ExxatTag, ExxatTagOptions } from '@exxat/plugin/tags';
interface HeaderContentItem {
  id: string;
  name: string;
}

@Component({
  selector: 'ryzen-exxat-card-example1',
  templateUrl: './exxat-card-example1.component.html',
  styleUrls: ['./exxat-card-example1.component.scss']
})
export class ExxatCardExample1Component {

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
   'max-width': '450',
    width: '450',
    pointerEvents: 'auto',
  };

  @ViewChild('title') title: ElementRef;

  constructor( public _UXDemoDrawerService: UXDemoDrawerService, public elementRef: ElementRef) {}

  isOptionTruncated(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      let isBig = elem.scrollWidth > elem.clientWidth;
      if (isBig) {
        let optionText = Array.from(
          elem.getElementsByClassName(
            'mat-option-text '
          ) as HTMLCollectionOf<HTMLElement>
        );
        optionText[0].style.overflow = 'hidden !important';
        optionText[0].style.textOverflow = 'ellipsis !important';
        optionText[0].style.display = 'initial !important';
      }
      return isBig;
    } else {
      return false;
    }
  }
  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
    return (elem.scrollHeight > 40); // 40 is the value of height of the 2 line text
    }
    else {
    return false;
    }
    }
  //header carousel
  @ViewChild('content_header') content_header: ElementRef;
  screenWidth = window.innerWidth;


   currentHeaderStep: number = 0;

   currentDatesStep: number = 0;
   
   headerItems: Array<HeaderContentItem> = [
    {
        id: 'id_01',
        name: 'Oct 1, 2021'
    },
    {
        id: 'id_02',
        name: 'Oct 2, 2021',
    },
    {
        id: 'id_03',
        name: 'Oct 3, 2022'
    },
    {
        id: 'id_04',
        name: 'Oct 4, 2021'
    }
]

getClass(status: string): string {
    return status.replace(/\s/g, "").trim().toLowerCase();
}

onHeaderCarouselEvent($event: CarouselEvent) {
    this.currentHeaderStep = $event.currentStep;
}

public tagOptions = new ExxatTagOptions();

@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

@Output() menuOpened: EventEmitter<void>;

tags: Array<ExxatTag> = [
  { id: Math.random(), name: 'Tag Label 1 Bigger Text', color: 'indigo-500', isChecked: true },
  { id: Math.random(), name: 'Tag Label 2', color: 'deep-orange-500', isChecked: true },
  { id: Math.random(), name: 'Tag Label 3', color: 'pink-500', isChecked: false },
  { id: Math.random(), name: 'Tag Label 4 Bigger Text', color: 'blue-500', isChecked: true },
  { id: Math.random(), name: 'Tag Label 5', color: 'gray-500', isChecked: true },
  { id: Math.random(), name: 'Tag Label 6', color: 'purple-500', isChecked: false },
  { id: Math.random(), name: 'Tag Label 7 Bigger Text', color: 'yellow-500', isChecked: true },
  { id: Math.random(), name: 'Tag Label 8', color: 'green-500', isChecked: false },
  { id: Math.random(), name: 'Tag Label 9', color: 'pink-500', isChecked: false },
  { id: Math.random(), name: 'Tag Label 10 Bigger Text', color: 'indigo-500', isChecked: true }
];

tagsCopy = JSON.parse(JSON.stringify(this.tags));

openTagswithButtons() {
  this.tagOptions = {
    saveButton: true,
    tagTitleMaxLength: 50,
    tagsListLength: 10
  }
}

tagsChanged($event: any) {
  if (this.tagOptions.saveButton
    && $event.eventType.toLowerCase() === 'change') {
    this.tagsCopy = JSON.parse(JSON.stringify($event.tags));
    this.trigger.closeMenu();
  }
  else if ($event.eventType == 'Add') {
    this.tagsCopy.push(JSON.parse(JSON.stringify($event.tags)));
  }
}


}
