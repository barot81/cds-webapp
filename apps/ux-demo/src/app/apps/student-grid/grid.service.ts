import { Injectable, OnInit } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { EditColumnsComponent } from './edit-columns/edit-columns.component';
import { RotationDrawerComponent } from '../placement/tabs/manage-placements/rotation-drawer/rotation-drawer.component';
import { RoutingChecklistDrawerComponent } from '../site-demo/tabs/contracts/routing-checklist-drawer/routing-checklist-drawer.component';

@Injectable({providedIn: 'any'})
export class GridService extends ComponentMap {

  constructor() {
    super();
    this.add('ryzen-edit-columns', EditColumnsComponent);
    this.add('ryzen-rotation-drawer', RotationDrawerComponent);
    this.add('ryzen-routing-checklist-drawer', RoutingChecklistDrawerComponent);
  }
}
