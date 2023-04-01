import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-exxat-toggle-example',
  templateUrl: './exxat-toggle-example.component.html',
  styleUrls: ['./exxat-toggle-example.component.scss']
})
export class ExxatToggleExampleComponent implements OnInit {

  constructor() { }


  filterList = [
    { viewName: '2010', value: '2010' },
    { viewName: '2011', value: '2011' },
    { viewName: '2012', value: '2012' }
  ]

  ngOnInit() {
  }

}
