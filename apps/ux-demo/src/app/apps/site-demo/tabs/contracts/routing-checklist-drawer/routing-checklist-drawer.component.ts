import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-routing-checklist-drawer',
  templateUrl: './routing-checklist-drawer.component.html',
  styleUrls: ['./routing-checklist-drawer.component.scss']
})
export class RoutingChecklistDrawerComponent implements OnInit {
  card9Expanded = false;
  constructor() {}

  ngOnInit() {}

  checkboxClick() {
    this.card9Expanded = !this.card9Expanded;
  }
}
