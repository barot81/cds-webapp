/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
export interface ux_repo_item {
  title: string;
  icon: string;
  description?: string;
  page?: string;
  isAccessible?: boolean;
  isThemeChanged?: boolean;
  isUxApproved?: boolean;
}

@Component({
  selector: 'ryzen-zhealthcare-ux-repo',
  templateUrl: './zhealthcare-ux-repo.component.html',
  styleUrls: ['./zhealthcare-ux-repo.component.scss'],
})
export class zhealthcareUxRepoComponent {
  searchItem = new FormControl();

  ux_repo_list: ux_repo_item[] = [
    {
      icon: 'fa-block-quote',
      title: 'Scrollable Form',
      description: 'Scrollable Form',
      page: '/admin/ux/ui/scrollable-form',
    },
    {
      icon: 'fa-info',
      title: 'Info Boxes',
      description: 'Example of Info Boxes',
      page: '/admin/ux/ui/info-boxes',
    },
    {
      icon: 'fa-newspaper',
      title: 'CK Editor',
      description: 'CK Editor',
      page: '/admin/ux/ui/ck-editor-demo',
    },
    {
      icon: 'fa-gallery-thumbnails',
      title: 'zhealthcare Carousel Demo',
      description: 'zhealthcare Carousel Demo',
      page: '/admin/ux/ui/zhealthcare-carousel-demo',
    },
    {
      icon: 'fa-grip-dots-vertical',
      title: 'Drag And Drop',
      description: 'Drag And Drop Example',
      page: '/admin/ux/ui/drag-and-drop',
    },
    {
      icon: 'fa-filter',
      title: 'Filter',
      description: 'Filter Drawer Example',
      page: '/admin/ux/ui/filter-example',
    },
    {
      icon: 'fa-stairs',
      title: 'Vertical Stepper Demo',
      description: 'Vertical Stepper Demo',
      page: '/admin/ux/ui/vertical_stepper_demo',
    },
    {
      icon: 'fa-chart-area',
      title: 'zhealthcare Graphs Standards',
      description: 'zhealthcare Graphs Standards',
      page: '/admin/ux/ui/zhealthcare_graphs_standards',
    },
    {
      icon: 'fa-microchip',
      title: 'Chips',
      description: '2 types of chips examples.',
      page: '/admin/ux/ui/chips-demo',
    },
    // { icon: 'fa-layer-group', title: 'Ngx Chart Examples', description: 'Ngx Chart Examples', page: '/admin/ux/ui/ngx-chart-demo' },
    {
      icon: 'fa-slider',
      title: 'Range Slider',
      description: 'Range Slider Example',
      page: '/admin/ux/ui/range-slider-demo',
    },
    {
      icon: 'fa-comment-dots',
      title: 'Tooltip',
      description: 'zhealthcare tooltip examples',
      page: '/admin/ux/ui/tooltip-demo',
    },
    {
      icon: 'fa-bars-progress',
      title: 'Snackbar',
      description: 'Snackbar examples',
      page: '/admin/ux/ui/snackbar',
    },
    //{ icon: 'fa-layer-group', title: 'Resizable Demo', description: 'Resizable Component Demo', page: '/admin/ux/ui/resizable-demo',isAccessible: true },
    {
      icon: 'fa-credit-card-blank',
      title: 'Cards',
      description: '3 examples of card.',
      page: '/admin/ux/ui/cards',
    },
    {
      icon: 'fa-map',
      title: 'Drawer',
      description: 'Drawer with forms and different types of sizes.',
      page: '/admin/ux/ui/zhealthcare-drawers',
    },
    {
      icon: 'fa-paintbrush',
      title: 'Colors',
      description: 'Fuse Theme Colors.',
      page: '/admin/ux/ui/colors',
    },
    {
      icon: 'fa-text',
      title: 'Typography',
      description: 'zhealthcare Theme Typography',
      page: '/admin/ux/ui/typography',
    },
    // {
    //   icon: 'fa-icons',
    //   title: 'Icons',
    //   description: 'Collection of Icons',
    //   page: '/admin/ux/ui/icons',
    //
    //
    //   isUxApproved: false,
    // },
    {
      icon: 'fa-magnifying-glass',
      title: 'Search',
      description: '3 types of search examples.',
      page: '/admin/ux/ui/search-bar',
    },
    {
      icon: 'fa-file',
      title: 'File Viewer Overlay',
      description: '4 types of file viewer overlay examples.',
      page: '/admin/ux/ui/zhealthcare-overlay',
    },
    {
      icon: 'fa-file',
      title: 'Dynamic Overlay',
      description: 'Dynamic Overlay Example.',
      page: '/admin/ux/ui/dynamic-overlay',
    },
    {
      icon: 'fa-light fa-location-arrow',
      title: 'Navigation',
      description: 'Different types Navigation.',
      page: '/admin/ux/ui/navigation',
    },
    {
      icon: 'fa-square-list',
      title: 'Form Control',
      description: 'Example of all form controls.',
      page: '/admin/ux/ui/form-controls',
    },
    {
      icon: 'fa-play-pause',
      title: 'Buttons',
      description: 'Example of different types of buttons',
      page: '/admin/ux/ui/zhealthcare-buttons',
    },
    {
      icon: 'fa-tasks-alt',
      title: 'Skeleton',
      description: 'Example of different types of skeletons.',
      page: '/admin/ux/ui/zhealthcare-skeleton-example',
    },
    {
      icon: 'fa-tags',
      title: 'zhealthcare Tag Component',
      description: '2 types of zhealthcare tag component.',
      page: '/admin/ux/ui/zhealthcare-tags',

      isUxApproved: false,
    },
    {
      icon: 'fa-album',
      title: 'Confirm Dialog Box',
      description: '2 types of conform dialog boxes.',
      page: '/admin/ux/ui/confirm-dialog-box-demo',
    },
    // {
    //   icon: 'fa-album',
    //   title: 'Evaluation drawer examples',
    //   description: 'two types of drawer examples',
    //   page: '/admin/ux/ui/evaluation-drawer-examples',
    //
    //   isUxApproved: false,
    // },
    // {
    //   icon: 'fa-wpforms',
    //   title: 'zhealthcare Forms',
    //   description: 'Platform based forms with workflow, layout and responses',
    //   page: '/admin/ux/ui/zhealthcare-forms',
    //
    //   isUxApproved: false,
    //
    // },
    {
      icon: 'fa-angle-double-down',
      title: 'Accordian',
      description: 'Example of accordian.',
      page: '/admin/ux/ui/zhealthcare-accordian',
    },
    {
      icon: 'fa-user-tie',
      title: 'Avatar',
      description: 'Example of avatar.',
      page: '/admin/ux/ui/zhealthcare-avatar-demo',
    },
    {
      icon: 'fa-spinner',
      title: 'Progress Spinner',
      description: 'Example of spinner.',
      page: '/admin/ux/ui/spinner-example',
    },
    {
      icon: 'fa-palette',
      title: 'zhealthcare Setting Color ',
      description: 'Custom colors for settings.',
      page: '/admin/ux/ui/color-shades-grid',
    },
    {
      icon: 'fa-file-upload',
      title: 'File Upload',
      description: 'Example of file upload.',
      page: '/admin/ux/ui/file-upload-example',
    },
    {
      icon: 'fa-folder-tree',
      title: 'zhealthcare Tree',
      description: 'Example of zhealthcare tree.',
      page: '/admin/ux/ui/zhealthcare-trees',
    },
    {
      icon: 'fa-stairs',
      title: 'Wizard',
      description: 'Example of wizard.',
      page: '/admin/ux/ui/zhealthcare-wizards',
    },
    {
      icon: 'fa-sidebar',
      title: 'Sidebar',
      description: 'Example of sidebars.',
      page: '/admin/ux/ui/zhealthcare-sidebar',
    },
    //{ icon: 'fa-layer-group', title: 'Horizontal Tree Control', description: 'Demo of horizontal tree control.', page: '/admin/ux/apps/horizontal-tree-control/tab1',isAccessible: true }
  ];

  filtered_UX_Repo_List = new BehaviorSubject<ux_repo_item[]>(
    new Array<ux_repo_item>()
  );

  filtered_UX_Repo_List$ = this.filtered_UX_Repo_List.asObservable();

  constructor() {
    this.ux_repo_list = this.ux_repo_list.sort((a, b) =>
      a.title > b.title ? 1 : -1
    );

    this.filtered_UX_Repo_List.next(this.ux_repo_list);

    this.searchItem.valueChanges.subscribe((changes) => {
      if (changes && changes !== null && changes.length > 0) {
        if (
          this._filter(changes, 'title').length > 0 &&
          this._filter(changes, 'description').length > 0
        ) {
          const data = this._filter(changes, 'title').concat(
            this._filter(changes, 'description')
          );

          const unique = data.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
          });

          this.filtered_UX_Repo_List.next(unique);
        } else if (this._filter(changes, 'title').length > 0) {
          this.filtered_UX_Repo_List.next(this._filter(changes, 'title'));
        } else {
          this.filtered_UX_Repo_List.next(this._filter(changes, 'description'));
        }
      } else {
        this.filtered_UX_Repo_List.next(this.ux_repo_list);
      }
    });
  }

  private _filter(value: string, searchItem: string): ux_repo_item[] {
    const filterValue = value.toLowerCase();

    return this.ux_repo_list.filter(
      (item) =>
        item[searchItem].toString().toLowerCase().indexOf(filterValue) > -1
    );
  }
}
