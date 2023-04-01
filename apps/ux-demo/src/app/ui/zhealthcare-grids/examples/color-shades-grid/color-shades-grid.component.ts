


import {Component, VERSION} from '@angular/core';
import { ItemsDataSource } from './items-data-source';


@Component({
  selector: 'ryzen-color-shades-grid',
  templateUrl: './color-shades-grid.component.html',
  styleUrls: ['./color-shades-grid.component.scss']
})
export class ColorShadesGridComponent {
  public dataSource = new ItemsDataSource(); ;

    public displayedColumns: string[] = 
    [ "count" , "code", "name" ,"color"];

  public version = VERSION;
}

