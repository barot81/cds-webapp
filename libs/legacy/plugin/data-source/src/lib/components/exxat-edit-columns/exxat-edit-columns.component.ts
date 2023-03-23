import { Component, OnInit } from '@angular/core';
import { DataSourceComponentService } from './datasource-component.service';

@Component({
  selector: 'zhealthcare-edit-columns',
  templateUrl: './zhealthcare-edit-columns.component.html',
 // styleUrls: ['./zhealthcare-edit-columns.component.scss']
})
export class zhealthcareEditColumnsComponent implements OnInit {

  constructor(public dataSourceComponentService:DataSourceComponentService) { }

  ngOnInit() {
  }

}
