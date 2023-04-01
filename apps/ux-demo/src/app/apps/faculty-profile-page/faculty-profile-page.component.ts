
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileCard, FileConfiguration, FileEndpoint } from '@exxat/plugin/file-upload';
import { BreadCrumbType, CarouselEvent, FuseSidebarService } from '@exxat/ux';
import { SecurityContext } from '@exxat/fusion/models';
import { BehaviorSubject } from 'rxjs';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';

interface HeaderContentItem {
    id: string;
    title: string;
}
@Component({
  selector: 'faculty-profile-page',
  templateUrl: './faculty-profile-page.component.html',
  styleUrls: ['./faculty-profile-page.component.scss']
})
export class FacultyProfilePageComponent {
  fileConfiguration: FileConfiguration;
  uxDemoAPPSecurityContext: SecurityContext;
  constructor( private _fuseSidebarService: FuseSidebarService, public _UXDemoDrawerService: UXDemoDrawerService) {
    // File Upload Configuration  -- START
    this.fileConfiguration = new FileConfiguration();
    this.fileConfiguration.fileEndpoint = new FileEndpoint('exxat.ux', 'Demo');
    this.fileConfiguration.fileCards = [];
    const fileCard = new FileCard();
    this.fileConfiguration.fileCards.push(fileCard);
    this.fileConfiguration.securityContext = this.uxDemoAPPSecurityContext;
    fileCard.filePath = 'UX Demo';
    // File Upload Configuration  -- END
  }
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectedId: number = 1;
  sidenavItem = [
    {id:0, title:'Profile Info', icon:'fa-address-card'},
    {id:1, title:'Teaching', icon:'fa-chalkboard-teacher'},
    {id:2, title:'Scholarship', icon: 'fa-diploma'},
    {id:3, title:'Service', icon: 'fa-handshake'},
    {id:4, title:'Clinical Coursework (#)', icon: 'fa-user-nurse'}
  ]

  //header carousel
  @ViewChild('content_header') content_header: ElementRef;
  screenWidth = window.innerWidth;


   currentHeaderStep: number = 0;

   currentDatesStep: number = 0;
   
   headerItems: Array<HeaderContentItem> = [
    {
        id: 'id_01',
        title: 'Marshall,Tatum'
    },
    {
        id: 'id_02',
        title: 'James,Spector',
    },
    {
        id: 'id_03',
        title: 'Mickel,Ross'
    },
    {
        id: 'id_04',
        title: 'Marshall,Tatum'
    }
]

getClass(status: string): string {
    return status.replace(/\s/g, "").trim().toLowerCase();
}

onHeaderCarouselEvent($event: CarouselEvent) {
    this.currentHeaderStep = $event.currentStep;
}

//header carousel end

  _breadCrumbType = BreadCrumbType;

  breadcrumbs = [
    { title: 'Faculty', route: '/admin/profile/search', order: 0 },
    { title: 'Strong Anna', route: '/admin/profile/details/40324c3e-f36b-1410-8d59-00ffffffffff/academics', order: 1 }
  ]

  ngOnInit() {
    this.loading$.next(true);

    setTimeout(()=>{
      this.loading$.next(false);
    },0)
  }

  activateNavigation(item:number) {
    this.selectedId = item;
  }
  // toogle sidebar in small screens
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

    toggleSidebarFolded(): void
    {
        this._fuseSidebarService.getSidebar('faculty-page-sidebar').toggleFold();
    }


}




