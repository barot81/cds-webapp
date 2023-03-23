import { Component, OnInit, Input } from '@angular/core';
import { FusionNavigationService } from '@zhealthcare/fusion/services';
import lodash from 'lodash';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'zhealthcare-tabnavbar',
  templateUrl: './tabnavbar.component.html'
})
export class TabNavbarComponent implements OnInit {
  @Input() navigationId;
  navigations: any[];

  constructor(
    private _fusionNavigationService: FusionNavigationService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.navigations = this._fusionNavigationService.getNavigationItem(this.navigationId)['children'];
    this.activateNavigation(this.navigations.find(x => x.url === this._activatedRoute.snapshot['_routerState'].url.split('/')[this._activatedRoute.snapshot['_routerState'].url.split('/').length - 1]));
    // this._router.currentUrlTree.root.children.primary.segments[this._router.currentUrlTree.root.children.primary.segments.length - 1].path;
  }

  activateNavigation(link) {
    if(link!=undefined){
      const navigationItem = lodash.cloneDeep(this.navigations.find(x => x.id === link.id));
    navigationItem.active = true;
    }
  }
}
