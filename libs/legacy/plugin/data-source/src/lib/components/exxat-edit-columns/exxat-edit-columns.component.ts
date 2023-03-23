import { Component, OnInit } from '@angular/core';
import { DataSourceComponentService } from './datasource-component.service';

@Component({
  selector: 'exxat-edit-columns',
  templateUrl: './exxat-edit-columns.component.html',
 // styleUrls: ['./exxat-edit-columns.component.scss']
})
export class ExxatEditColumnsComponent implements OnInit {

  constructor(public dataSourceComponentService:DataSourceComponentService) { }

  ngOnInit() {
  }

}
