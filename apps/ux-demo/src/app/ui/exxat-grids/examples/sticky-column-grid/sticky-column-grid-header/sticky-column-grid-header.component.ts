import { Component } from '@angular/core';
import { FullScreenService } from '@exxat/ux';
import { FormControl } from '@angular/forms';
import { GridService } from '../../../../../apps/student-grid/grid.service';
import { UXDemoDrawerService } from '../../../../../remote-entry/ux-demo-drawer.service';



@Component({
  selector: 'exxat-sticky-column-grid-header',
  templateUrl: './sticky-column-grid-header.component.html',
})
export class StickyColumnGridHeaderComponent {
  fullScreenMode: boolean = false;
  searchItem = new FormControl();

  constructor(
    public gridService: GridService,
    public _UXDemoDrawerService: UXDemoDrawerService,
    public _fullScreenService: FullScreenService
  ) {}

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto',
  };

  showTestAlert() {
    alert('test button clicked');
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.fullScreenMode = true;
        this._fullScreenService.setFullScreenModeEnabled(true);
      } else {
        this.fullScreenMode = false;
        this._fullScreenService.setFullScreenModeEnabled(false);
      }
    });
  }

  //#endregion

  // toggleFullScreenMode() {
  //   this.fullScreenMode = !this.fullScreenMode;
  //   if (this.fullScreenMode) {
  //     setTimeout(() => {
  //       document.documentElement.requestFullscreen();
  //     });
  //   } else {
  //     document.exitFullscreen();
  //   }
  //   this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);
  // }
}
