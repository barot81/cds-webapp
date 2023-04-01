
import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@exxat/ux';
import { HeaderService } from '@exxat/ux';
import { GridService } from '../../../student-grid/grid.service';
@Component({
  selector: 'ryzen-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  tooltipOptions = {
    'contentType': 'string',
    'placement': 'right',
    'trigger': 'hover',
    'max-width': '450',
    'width': 'auto',
    'pointerEvents': 'auto'
    }
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  constructor( private _fuseSidebarService: FuseSidebarService, public headerService: HeaderService, public gridService: GridService) { }

  ngOnInit() {
  }

  // toogle sidebar in small screens
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

    toggleSidebarFolded(): void
    {
        this._fuseSidebarService.getSidebar('carded-left-sidebar-tabbed-2').toggleFold();
    }

}



