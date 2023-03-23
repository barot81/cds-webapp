// import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { ExxatTag } from '../exxat-tag/exxat-tag.component';
// import { TagView } from '../model';

// @Component({
//   selector: 'exxat-tag-showcase',
//   templateUrl: './exxat-tag-showcase.component.html',
//   styleUrls: ['./exxat-tag-showcase.component.scss'],
// })
// export class ExxatTagShowCaseComponent implements OnChanges {
//   TAGVIEW = TagView;

//   private tags = new BehaviorSubject<Array<ExxatTag>>(new Array<ExxatTag>());
//   tags$ = this.tags.asObservable();

//   tagView?: TagView = TagView.LABEL;

//   @Input('tags')
//   set setTags(value: Array<ExxatTag>) {
//     if (value && value !== null) {
//       let tagsList = value.filter((x) =>
//         x.isChecked === undefined || x.isChecked === null
//           ? true
//           : x.isChecked === true
//       );
//       this.tags.next(JSON.parse(JSON.stringify(tagsList)));
//     }
//   }

//   @Input('tagView')
//   set setTagView(value: TagView) {
//     if (value && value != null) {
//       this.tagView = value;
//     }
//   }

//   tooltipOptionsTop = {
//     contentType: 'string',
//     placement: 'top',
//     trigger: 'hover',
//     theme: 'dark',
//     pointerEvents: 'auto',
//   };

//   tooltipOptionsRight = {
//     contentType: 'string',
//     placement: 'right',
//     trigger: 'hover',
//     theme: 'dark',
//     pointerEvents: 'auto',
//   };

//   //#region [ANGULAR CORE]

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes.setTags && changes.setTags != null) {
//       let tagsList = changes.setTags.currentValue.filter((x) =>
//         x.isChecked === undefined || x.isChecked === null
//           ? true
//           : x.isChecked === true
//       );
//       this.tags.next(JSON.parse(JSON.stringify(tagsList)));
//     }
//   }

//   //#endregion

//   isTextOverflow(elementId: string): boolean {
//     const elem = document.getElementById(elementId);
//     if (elem) {
//       return elem.offsetHeight < elem.scrollHeight;
//     } else {
//       return false;
//     }
//   }

//   isTextOverflowChip(elementId: string): boolean {
//     const elem = document.getElementById(elementId);
//     if (elem) {
//       return elem.offsetWidth < elem.scrollWidth;
//     } else {
//       return false;
//     }
//   }

//   getTagTitle(tag: ExxatTag): string {
//     if (tag && tag !== null) {
//       return tag.name && tag.name !== null ? tag.name : tag.title;
//     }
//   }

//   getTagColor(tag: ExxatTag): string {
//     if (tag && tag !== null) {
//       return tag.color && tag.color !== null ? tag.color : tag.colorCode;
//     }
//   }
// }

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject } from 'rxjs';
import { ExxatTag } from '../exxat-tag/exxat-tag.component';
import { MenuTrigger, TagView } from '../model';

@Component({
  selector: 'exxat-tag-showcase',
  templateUrl: './exxat-tag-showcase.component.html',
  styleUrls: ['./exxat-tag-showcase.component.scss']
})
export class ExxatTagShowCaseComponent implements OnChanges {
  enteredButton = false;
  isMatMenuOpen = false;
  prevButtonTrigger: MatMenuTrigger;

  TAGVIEW = TagView;

  private tags = new BehaviorSubject<Array<ExxatTag>>(new Array<ExxatTag>());
  tags$ = this.tags.asObservable();

  private _triggerOn = new BehaviorSubject<MenuTrigger>('hover');
  _triggerOn$ = this._triggerOn.asObservable();

  tagView?: TagView = TagView.LABEL;

  _tagsLength: number = 3;
  tempLength: number = this._tagsLength;
  _isGrid: boolean = false;

  @Input('tags')
  set setTags(value: Array<ExxatTag>) {
    if (value && value !== null) {
      let tagsList = value.filter((x) =>
        x.isChecked === undefined || x.isChecked === null
          ? true
          : x.isChecked === true
      );
      this.tags.next(JSON.parse(JSON.stringify(tagsList)));
    }
  }

  @Input('triggerOn') triggerOn;
  set setTriggerOn(value: MenuTrigger) {
    if (value && value !== null) {
      this._triggerOn.next(value);
    }
  }

  @Input('tagView')
  set setTagView(value: TagView) {
    if (value && value != null) {
      this.tagView = value;
    }
  }

  @Input('tagsLength')
  set setTagsLength(value: number) {
    if (value && value !== null) {
      this._tagsLength = value;
      this.tempLength = value;
    }
  }

  @Input('isGrid')
  set setIsGrid(value: boolean) {
    if (value && value !== null) {
      this._isGrid = value;
    }
  }

  tooltipOptionsTop = {
    contentType: 'string',
    placement: 'top',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto'
  };

  tooltipOptionsRight = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto'
  };

  //#region [ANGULAR CORE]
  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.setTags && changes.setTags != null) {
      let tagsList = changes.setTags.currentValue?.filter((x) =>
        x.isChecked === undefined || x.isChecked === null
          ? true
          : x.isChecked === true
      );
      this.tags.next(JSON.parse(JSON.stringify(tagsList)));
    }
    if (changes.setTriggerOn && changes.setTriggerOn !== null) {
      this._triggerOn.next(changes.setTriggerOn.currentValue);
    }
    this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (!state.matches && !this._isGrid) {
          this._tagsLength = 1;
        } else {
          this.breakpointObserver
            .observe(['(min-width: 1024px )'])
            .subscribe((state: BreakpointState) => {
              if (!state.matches && !this._isGrid) {
                this._tagsLength = 3;
              } else {
                this._tagsLength = this.tempLength;
              }
            });
        }
      });
  }

  //#endregion

  // isTextOverflow(elementId: string): boolean {
  //   const elem = document.getElementById(elementId);
  //   if (elem && elem !== null) {
  //     debugger;
  //     return elem.offsetWidth <= elem.scrollWidth;
  //   } else {
  //     return false;
  //   }
  // }

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);

    if (elem && elem !== null) {
      return elem.offsetWidth < elem.scrollWidth;
    } else {
      return false;
    }
  }

  isTextOverflowChip(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.offsetWidth < elem.scrollWidth;
    } else {
      return false;
    }
  }

  getTagTitle(tag: ExxatTag): string {
    if (tag && tag !== null) {
      return tag.name && tag.name !== null ? tag.name : tag.title;
    }
  }

  getTagId(tag: any): string {
    return tag?.id && tag?.id !== null ? tag?.id : tag?.tagId;
  }

  getTagColor(tag: ExxatTag): string {
    if (tag && tag !== null) {
      return tag.color && tag.color !== null ? tag.color : tag.colorCode;
    }
  }
}
