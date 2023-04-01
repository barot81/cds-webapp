import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-zhealthcare-toggle-example',
  templateUrl: './zhealthcare-toggle-example.component.html',
  styleUrls: ['./zhealthcare-toggle-example.component.scss']
})
export class zhealthcareToggleExampleComponent implements OnInit {

  constructor() { }


  filterList = [
    { viewName: '2010', value: '2010' },
    { viewName: '2011', value: '2011' },
    { viewName: '2012', value: '2012' }
  ]

  ngOnInit() {
  }

}
