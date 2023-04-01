
import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@zhealthcare/ux';
import { HeaderService } from '@zhealthcare/ux';
@Component({
  selector: 'ryzen-map-of-affiliation-demo',
  templateUrl: './map-of-affiliation-demo.component.html',
  styleUrls: ['./map-of-affiliation-demo.component.scss']
})
export class MapOfAffiliationDemoComponent implements OnInit {
  tooltipOptions = {
    'contentType': 'string',
    'placement': 'right',
    'trigger': 'hover',
    'max-width': '450',
    'width': 'auto',
    'pointerEvents': 'auto'
    }
  
  constructor( private _fuseSidebarService: FuseSidebarService, public headerService: HeaderService) { }

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




