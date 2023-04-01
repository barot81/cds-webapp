import { Component, ViewChild, ElementRef } from '@angular/core';
import { FullScreenService } from '@exxat/ux';
import { GridService } from '../../../../apps/student-grid/grid.service';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

@Component({
  selector: 'exxat-simple-grid-header',
  templateUrl: './simple-grid-header.component.html',
})
export class SimpleGridHeaderComponent {
  fullScreenMode: boolean = false;

  @ViewChild('header') elementView: ElementRef;

  constructor(
    public gridService: GridService,
    public _UXDemoDrawerService: UXDemoDrawerService,
    public _fullScreenService: FullScreenService
  ) {}

  //chips code
  fruits: string[] = ['Cohort Dsdsj', 'Cohort Dsdsj', 'Cohort Dsdsj'];
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  //chips code end

  SearchFields = [
    { value: 'Student Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'Phone', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 },
  ];

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto',
  };

  toggleFullScreenMode() {
    this.fullScreenMode = !this.fullScreenMode;
    if (this.fullScreenMode) {
      setTimeout(() => {
        document.documentElement.requestFullscreen();
      });
    } else {
      document.exitFullscreen();
    }
    this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);
  }
}
