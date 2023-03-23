import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export enum BreadCrumbType {
  'GLOBAL' = 0,
  'PARTIAL' = 1,
}

@Component({
  selector: 'exxat-breadcrumb',
  templateUrl: './exxat-breadcrumb.component.html',
  styleUrls: ['./exxat-breadcrumb.component.scss'],
})
export class ExxatBreadcrumbComponent implements OnInit {
  _breadCrumbType = BreadCrumbType;

  @Input() dataSource;
  @Input() type: BreadCrumbType = BreadCrumbType.GLOBAL;

  @Output() onLinkClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.dataSource = this.sortArray(this.dataSource);
  }

  sortArray(array: Array<any>) {
    return array?.sort((a, b) => {
      return a.order - b.order;
    });
  }

  linkClick(item: any): void {
    this.onLinkClick.emit(item);
  }
}
