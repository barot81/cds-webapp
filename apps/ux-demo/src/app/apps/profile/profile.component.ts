import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FuseSidebarService, HeaderService } from '@exxat/ux'
import { BehaviorSubject, from } from 'rxjs';

@Component({
  selector: 'exxat-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges, AfterViewInit {

  sidebar_header_height = new BehaviorSubject<number>(0);
  sidebar_header_height$ = this.sidebar_header_height.asObservable();

  @ViewChild('sidebar_header') sidebar_header: ElementRef;
  searchText: string;
  selectedId: number = 1;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  students = [
    {id:0, firstName:'Anna', lastName: 'Strong'},
    {id:1, firstName:'Mindy', lastName: 'Strong'},
    {id:2, firstName:'Jeremy', lastName: 'Strong'},
    {id:3, firstName:'Dan', lastName: 'Strong'},
    {id:4, firstName:'Jim', lastName: 'Strong'},
    {id:5, firstName:'Michael', lastName: 'Strong'},
    {id:6, firstName:'Pam', lastName: 'Strong'},
    {id:7, firstName:'Kevin', lastName: 'Strong'},
    {id:8, firstName:'Dwight', lastName: 'Strong'},
    {id:9, firstName:'Angela', lastName: 'Strong'},
    {id:10, firstName:'Andy', lastName: 'Strong'} 
  ]
  /**
   * Constructor
   *
   * @param {FuseSidebarService} _fuseSidebarService
   */

  constructor( private _fuseSidebarService: FuseSidebarService, private _headerService: HeaderService) { }
  
  ngAfterViewInit() {
    setTimeout(async () => {
      await this._headerService.setCurrentHeaderHeight(0);
      await this.setSidebarHeaderHeight();
    })
  }

  private setSidebarHeaderHeight(): void {
    if (this.sidebar_header && this.sidebar_header !== null) {
      this.sidebar_header_height.next(
        this.sidebar_header.nativeElement.offsetHeight 
      );
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.loading$.next(true);

    setTimeout(()=>{
      this.loading$.next(false);
    },0)
  }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    activateNavigation(item:number) {
      this.selectedId = item;
    }
}
