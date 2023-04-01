
import { Component, OnInit ,Output, EventEmitter, ViewChild ,ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FuseSidebarService } from '@zhealthcare/ux';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { zhealthcareTagOptions } from '@zhealthcare/plugin/tags';
import { GridService } from '../../student-grid/grid.service';
import { PlanAppDemoDrawerService } from '../plan-app-demo-drawer.service';
import { OverlayService } from '@zhealthcare/ux';
import { ComponentType } from '@angular/cdk/portal';
import { DocumentViewerConfiguration, FileEndpoint } from '@zhealthcare/plugin/file-upload';
import { FileViewerContainerComponent } from '../../../ui/zhealthcare-overlay-demo/file-viewer-container/file-viewer-container.component';

export interface PeriodicElement {
    weightage: string;
    assessment: number;
    grade: number;
    scale: string;
    actions:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { assessment: 1, weightage: 'Hydrogen', grade: 1.0079, scale: 'H',actions: 'three' },
  { assessment: 2, weightage: 'Helium', grade: 4.0026, scale: 'He' ,actions: 'three'},
  { assessment: 3, weightage: 'Lithium', grade: 6.941, scale: 'Li' ,actions: 'three'},
  { assessment: 4, weightage: 'Beryllium', grade: 9.0122, scale: 'Be',actions: 'three' },
];



@Component({
  selector: 'ryzen-plan-course-details-demo',
  templateUrl: './plan-course-details-demo.component.html',
  styleUrls: ['./plan-course-details-demo.component.scss']
})
export class PlanCourseDetailsDemoComponent implements OnInit {

  navigations = [
    {
      id: 'tab1',
      title: 'Course details',
      type: 'item',
      url: '/admin/ux/apps/plan-course-details-demo/tab1'
    },
    {
      id: 'tab2',
      title: 'Measures',
      type: 'item',
      url: '/admin/ux/apps/plan-course-details-demo/tab2'
    },
    {
      id: 'tab3',
      title: 'Events',
      type: 'item',
      url: '/admin/ux/apps/plan-course-details-demo/tab3'
    },
    {
      id: 'tab4',
      title: 'Resources',
      type: 'item',
      url: '/admin/ux/apps/plan-course-details-demo/tab4'
    },
    {
      id: 'tab5',
      title: 'Students registered',
      type: 'item',
      url: '/admin/ux/apps/plan-course-details-demo/tab5'
    }
  ];

  fileViewerComponentRef: any;
  documentConfiguration: DocumentViewerConfiguration;

  public tagOptions = new zhealthcareTagOptions();
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  @Output() menuOpened: EventEmitter<void>;

  tags = [{ id: Math.random(), name: 'Demo', color: 'pink-900', isChecked: true },
  { id: Math.random(), name: 'Test1', color: 'indigo-400', isChecked: false },
  { id: Math.random(), name: 'Test2', color: 'deep-orange-500', isChecked: false },
  { id: Math.random(), name: 'Test3', color: 'pink-900', isChecked: false },
  { id: Math.random(), name: 'New', color: 'indigo-400', isChecked: true }];



  constructor(public gridService: GridService,  public _PlanAppDemoDrawerService: PlanAppDemoDrawerService,
    private overlayService: OverlayService, private r: ComponentFactoryResolver) 
    {  this.documentConfiguration = new DocumentViewerConfiguration();
      this.documentConfiguration.fileEndpoint = new FileEndpoint('student.profile', 'student');
      this.documentConfiguration.fileCollectionKey = '3f817ef6-74a5-463b-bc64-64d44a966089';
      this.fileViewerComponentRef = this.r.resolveComponentFactory(FileViewerContainerComponent).componentType;}

      open(content: TemplateRef<any> | ComponentType<any> | string) {
        const ref = this.overlayService.open(content, this.documentConfiguration);
      }

  displayedColumns: string[] = ['assessment', 'weightage'];
  displayedColumnsGrade: string[] = [ 'grade', 'scale'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  cohortControl = new FormControl();

  cohorts = [
    { value: "Class 2020", viewValue: "Class 2020" },
    { value: "Class 2021", viewValue: "Class 2021" },
    { value: "Class 2022", viewValue: "Class 2022" },
  ];
  

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




