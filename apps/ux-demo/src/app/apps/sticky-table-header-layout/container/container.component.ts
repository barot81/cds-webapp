import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FuseSidebarService, HeaderService } from '@zhealthcare/ux';
import { StickyTableHeaderLayoutService } from '../services';
import { FormControl } from '@angular/forms';
import { TagView, zhealthcareTag } from '@zhealthcare/plugin/tags';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements AfterViewInit, OnInit {
  sidebar_header_height = new BehaviorSubject<number>(0);
  sidebar_header_height$ = this.sidebar_header_height.asObservable();
  selectedId: number = 1;

  public tagView = TagView;

  tags: Array<zhealthcareTag> = [
    {
      id: Math.random(),
      name: 'Tag Label 1 Bigger Text',
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

  searchItem = new FormControl();

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  students: any[] = [
    { id: 0, name: 'Anna Strong' },
    { id: 1, name: 'Peter Strong' },
    { id: 2, name: 'James Strong' },
    { id: 3, name: 'Mindy Strong' },
    { id: 4, name: 'Danny Strong' },
    { id: 5, name: 'Jeremy Strong' },
    { id: 6, name: 'Morgan Strong' },
    { id: 7, name: 'Tam Strong' },
    { id: 8, name: 'Anna Strong' },
    { id: 9, name: 'Anna Strong' }
  ];

  @ViewChild('sidebar_header') sidebar_header: ElementRef;
  @ViewChild('container_header') container_header: ElementRef;

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    public readonly _headerService: HeaderService,
    private readonly _stickyTableHeaderLayoutService: StickyTableHeaderLayoutService
  ) {}

  ngOnInit() {
    this.loading$.next(true);

    setTimeout(() => {
      this.loading$.next(false);
    }, 0);
  }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this._headerService.setCurrentHeaderHeight(0);
      await this.setSidebarHeaderHeight();
      await this.setContainerHeaderHeight();
    });
  }

  private setSidebarHeaderHeight(): void {
    if (this.sidebar_header && this.sidebar_header !== null) {
      this.sidebar_header_height.next(
        this.sidebar_header.nativeElement.offsetHeight + 32
      );
    }
  }

  private setContainerHeaderHeight(): void {
    if (this.container_header && this.container_header !== null) {
      this._stickyTableHeaderLayoutService.setContainerHeaderHeight(
        this.container_header.nativeElement.offsetHeight
      );
    }
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  activateNavigation(item: number) {
    this.selectedId = item;
  }
}

