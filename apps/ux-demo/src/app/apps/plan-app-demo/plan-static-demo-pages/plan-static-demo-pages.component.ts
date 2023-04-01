import { AfterViewInit, Component, ElementRef, OnInit , ViewChild} from '@angular/core';
import { zhealthcareTagOptions } from '@zhealthcare/plugin/tags';
import { MatMenuTrigger } from '@angular/material/menu';
import { PlanDemoHeaderLayoutService } from './plan-static-header-service';

@Component({
  selector: 'ryzen-plan-static-demo-pages',
  templateUrl: './plan-static-demo-pages.component.html',
  styleUrls: ['./plan-static-demo-pages.component.scss']
})
export class PlanStaticDemoPagesComponent implements OnInit, AfterViewInit {

  navigations = [
    {
      id: 'tab1',
      title: 'Course details',
      type: 'item',
      url: '/admin/ux/apps/event-schedule-demo'
    },
    {
      id: 'tab2',
      title: 'Measures',
      type: 'item',
     // url: '/admin/ux/apps/measures-demo'
    },
    {
      id: 'tab4',
      title: 'Resources',
      type: 'item',
     // url: '/admin/ux/apps/resources-demo'
    },
    {
      id: 'tab5',
      title: 'Students registered',
      type: 'item',
     // url: '/admin/ux/apps/plan-course-details-demo/tab5'
    }
  ];

  public tagOptions = new zhealthcareTagOptions();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('header_container') header_container: ElementRef;
  @ViewChild('nav_container') nav_container: ElementRef;

  tags = [{ id: Math.random(), name: 'Demo', color: 'pink-900', isChecked: true },
  { id: Math.random(), name: 'Test1', color: 'indigo-400', isChecked: false },
  { id: Math.random(), name: 'Test2', color: 'deep-orange-500', isChecked: false },
  { id: Math.random(), name: 'Test3', color: 'pink-900', isChecked: false },
  { id: Math.random(), name: 'New', color: 'indigo-400', isChecked: true }];


  constructor(private _planHeaderService: PlanDemoHeaderLayoutService ) { }

  ngAfterViewInit() {
    setTimeout(async()=>{
        await this.setHeaderContainerHeight();
        await this.setNavContainerHeight();
    })
  }

  private setHeaderContainerHeight(){
    if(this.header_container && this.header_container !==null){
       this._planHeaderService.setContainerHeaderHeight(
         this.header_container.nativeElement.offsetHeight
       );
    }
  }

  private setNavContainerHeight(){
    if(this.nav_container && this.nav_container !==null){
       this._planHeaderService.setNavContainerHeight(
         this.nav_container.nativeElement.offsetHeight + 16
       );
    }
  }

  ngOnInit() {
  }

  openTagswithButtons() {
    this.tagOptions = {
      saveButton: true,
      tagTitleMaxLength: 50,
      tagsListLength: 7
    }
  }

  openTagswithoutButtons() {
    this.tagOptions = {
      saveButton: false,
      tagTitleMaxLength: 50,
      tagsListLength: 7
    }
  }

  tagsChanged($event: any) {
    if (this.tagOptions.saveButton
       && $event.eventType == 'Change')
      this.trigger.closeMenu();
  }

}
