import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FuseSidebarService, HeaderService } from '@exxat/ux';
import { BehaviorSubject } from 'rxjs';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';

@Component({
  selector: 'ryzen-static-role-configuration-page',
  templateUrl: './static-role-configuration-page.component.html',
})
export class StaticRoleConfigurationPageComponent implements OnInit, AfterViewInit {

  sidebar_header_height = new BehaviorSubject<number>(0);
  sidebar_header_height$ = this.sidebar_header_height.asObservable();

  @ViewChild('sidebar_header') sidebar_header: ElementRef;

  selectedId: number = 1;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  roles = [
    {id:0, name:'USC.Steps.Admin'},
    {id:1, name:'Role 1'},
    {id:2, name:'Role 2'},
    {id:3, name:'Role 3'},
    {id:4, name:'Role 4'},
    {id:5, name:'Role 5'},
    {id:6, name:'Role 6'},
    {id:7, name:'Role 7'},
    {id:8, name:'Role 8'},
    {id:9, name:'Role 9'},
    {id:10, name:'Role 10'},
  ]

  constructor(private _fuseSidebarService: FuseSidebarService,public _UXDemoDrawerService: UXDemoDrawerService, 
    public _headerService: HeaderService) { }
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  ngAfterViewInit(): void {
      setTimeout(async()=>{
        await this.setSidebarHeaderHeight();
      })
  }

  private setSidebarHeaderHeight(){
    if(this.sidebar_header && this.sidebar_header !==null){
      this.sidebar_header_height.next(
        this.sidebar_header.nativeElement.offsetHeight
      )
    }    
  }
  
  ngOnInit() {
    this.loading$.next(true);

    setTimeout(()=>{
      this.loading$.next(false);
    },0)
  }

  activateNavigation(item:number) {
    this.selectedId = item;
  }

}
