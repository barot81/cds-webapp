import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-drawer-with-sections',
  templateUrl: './drawer-with-sections.component.html',
  styleUrls: ['./drawer-with-sections.component.scss']
})
export class DrawerWithSectionsComponent implements OnInit {

  demoList = [
    { value: "demo1", viewValue: "Demo 1" },
    { value: "demo2", viewValue: "Demo 2" }
  ];
  constructor() { }

  ngOnInit() {
  }

}
