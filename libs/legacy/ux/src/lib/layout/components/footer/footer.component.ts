import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../vertical/layout-1/layout-1.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  _currentyear: number;
  /**
   * Constructor
   */
  constructor(public _layoutService: LayoutService) {
    this._currentyear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.getOrgTimeZone();
  }

  getOrgTimeZone() {
    const currentOrgTimeZone = JSON.parse(
      localStorage.getItem('orgUnitInformation')
    )?.find((x) => x.isSelected)?.timeZone;
    if (currentOrgTimeZone)
      this._layoutService._orgTimzone$.next(currentOrgTimeZone);
  }
}
