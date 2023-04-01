import { Component, OnInit } from '@angular/core';
import { FuseSidebarService, HighLightNavMenuService} from '@exxat/ux';


@Component({
  selector: 'ryzen-high-light-nav-menu-item-component-level',
  templateUrl: './high-light-nav-menu-item-component-level.component.html',
  styleUrls: ['./high-light-nav-menu-item-component-level.component.scss']
})
export class HighLightNavMenuItemComponentLevelComponent implements OnInit {

  scrollLevel = 'component';

  leftNavMenuList = [
    {
      id: 'home',
      title: 'Home',
    },
    {
      id: 'work',
      title: 'Work',
    },
    {
      id: 'about',
      title: 'About',
    },
    {
      id: 'contact',
      title: 'Contact',
    }
  ]

  constructor(private _fuseSidebarService: FuseSidebarService, private highLightNavMenuService: HighLightNavMenuService) { }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  changeNavMenuItem(id: string) {
    this.highLightNavMenuService.setCurrentNavMenuItem(id);
  }
}
