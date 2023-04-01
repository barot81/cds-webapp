import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@exxat/ux';

export class PlacementItem {
  id: number;
  isSelected: boolean;
  title: string;
  status: string;
  status_color: string;
  siteName: string;
  setting: string;
  startDate: string;
  endDate: string;
  duration: string;
  wishListmessage: string;
  attentionMessage: string;
}

const currentPlacementList: Array<PlacementItem> = [
  { id: Math.random(), isSelected: true, title: 'Clinical Education III', status: 'Current', status_color: 'info', siteName: 'Autumn Winds Retirement Lodge - Reliant Care', setting: 'Emergency Medicine', startDate: 'July 2nd,2020', endDate: 'Jul 30th,2020', duration: '', wishListmessage: '', attentionMessage: '' },
  { id: Math.random(), isSelected: false, title: 'Clinical Education IV', status: '', status_color: '', siteName: 'Hollywood Presbyterian Hospital', setting: 'Emergency Medicine', startDate: 'July 2nd,2020', endDate: 'Jul 30th,2020', duration: '', wishListmessage: '', attentionMessage: 'Attention required' },
  { id: Math.random(), isSelected: false, title: 'Clinical Education V', status: '', status_color: '', siteName: '', setting: '', startDate: '', endDate: '', duration: '', wishListmessage: '6 DAYS: 23 HOURS: 53 MINUTES ', attentionMessage: '' },
];

const completedPlacementList: Array<PlacementItem> = [
  { id: Math.random(), isSelected: false, title: 'Clinical Education II', status: '', status_color: '', siteName: 'Hollywood Presbyterian Hospital', setting: 'Emergency Medicine', startDate: 'July 2nd,2020', endDate: 'Jul 30th,2020', duration: '1 Week', wishListmessage: '', attentionMessage: '' },
  { id: Math.random(), isSelected: false, title: 'Clinical Education I', status: '', status_color: '', siteName: 'Hollywood Presbyterian Hospital', setting: 'Emergency Medicine', startDate: 'July 2nd,2020', endDate: 'Jul 30th,2020', duration: '1 Week', wishListmessage: '', attentionMessage: '' },
]
export class PlacementList {
  headerTitle: string;
  placements: Array<PlacementItem>;
  /**
   *
   */
  constructor() {
    this.placements = new Array<PlacementItem>();
  }
}


@Component({
  selector: 'ryzen-plan-of-study',
  templateUrl: './plan-of-study.component.html',
})
export class PlanOfStudyComponent implements OnInit {

  currentPlacements: PlacementList = {
    headerTitle: 'Placements',
    placements: currentPlacementList
  };

  completedPlacements: PlacementList = {
    headerTitle: 'Completed Placements',
    placements: completedPlacementList
  };

  placements: Array<PlacementList>;
  constructor(private _fuseSidebarService: FuseSidebarService) {
    this.placements = new Array<PlacementList>();
    this.placements.push(this.currentPlacements);
    this.placements.push(this.completedPlacements);
  }

  ngOnInit() {
  }

  selectPlacement(id: number) {

    this.placements.forEach(x => {
      x.placements.forEach(y => {
        if (y.id == id) {
          y.isSelected = true;
        }
        else {
          y.isSelected = false;
        }
      })
    })
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
