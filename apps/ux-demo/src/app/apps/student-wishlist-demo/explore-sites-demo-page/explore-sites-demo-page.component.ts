
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FuseSidebarService, HeaderService } from '@exxat/ux';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class DropdownSearchItem {
  id: number;
  title: string;
}

@Component({
  selector: 'ryzen-explore-sites-demo-page',
  templateUrl: './explore-sites-demo-page.component.html',
  styleUrls: ['./explore-sites-demo-page.component.scss']
})
export class ExploreSitesDemoPageComponent implements OnInit {

  dropdownSearchData: Array<DropdownSearchItem> = [
    {
      id: 1, title: 'Lorem ipsum'
    }, {
      id: 2, title: 'Lorem ipsum'
    }, {
      id: 3, title: 'Lorem ipsum'
    }, {
      id: 4, title: 'Lorem ipsum'
    }, {
      id: 5, title: 'Lorem ipsum'
    }, {
      id: 6, title: 'Lorem ipsum'
    },
  ]


  tooltipOptions = {
    'contentType': 'string',
    'placement': 'right',
    'trigger': 'hover',
    'max-width': '450',
    'width': '450',
    'pointerEvents': 'auto'
    }
    
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];


  filteredDropdownSearchData: Observable<Array<DropdownSearchItem>>;

  form: FormGroup;
  data: any;

  constructor(private _formBuilder: FormBuilder,public headerService: HeaderService, private _fuseSidebarService: FuseSidebarService,) { 
    this.form = this._formBuilder.group({
      dropdownSearch: ['', Validators.required]
    });
  }



  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredDropdownSearchData = this.form.get('dropdownSearch').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDropdownSearchData(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterDropdownSearchData(value: string): Array<DropdownSearchItem> {
    const filterValue = value.toLowerCase();
    return this.dropdownSearchData.filter(option => option.title.toLowerCase().includes(filterValue));
  }


  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}


