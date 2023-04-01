import { Component } from "@angular/core";
import { FuseSidebarService, HighLightNavMenuService } from "@exxat/ux";
import { SidebarFocusHelper } from "../../../exxat-sidebar/exxat-sidebar.service";

@Component({
    selector: 'exxat-drawer-with-highlight-menu',
    templateUrl:'./exxat-drawer-with-highlight-menu.component.html',
    styleUrls: ['./exxat-drawer-with-highlight-menu.component.scss']
})

export class ExxatDrawerWithHighlightMenuComponent{
    
    scrollLevel = 'component'

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
  
    constructor(private readonly _fuseSidebarService: FuseSidebarService, private readonly highLightNavMenuService: HighLightNavMenuService, public _focus: SidebarFocusHelper) { }
  
    ngOnInit() {
    }
  
    toggleSidebar(name): void {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
  
    changeNavMenuItem(id: string) {
      this._focus.shiftFocusWithId(id);
      this.highLightNavMenuService.setCurrentNavMenuItem(id);
    }

}