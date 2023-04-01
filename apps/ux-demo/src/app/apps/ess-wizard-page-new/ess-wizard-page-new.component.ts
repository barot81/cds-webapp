
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FileCard, FileConfiguration, FileEndpoint } from '@zhealthcare/plugin/file-upload';
import { BreadCrumbType, CarouselEvent, FuseSidebarService, HeaderService } from '@zhealthcare/ux';
import { SecurityContext } from '@zhealthcare/fusion/models';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../student-grid/grid.service';
import * as ClassicEditor from '@exxat/ckeditor5-build-classic';
interface HeaderContentItem {
    id: string;
    title: string;
}

export interface PeriodicElement {
    form:string;
    weightage: string;
    publishDate: string;
    midtermDue: string;
    finalDueDate:string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    { publishDate: '',form: '', weightage: '', midtermDue: '' ,finalDueDate:''},
  ];

@Component({
  selector: 'ess-wizard-page-new',
  templateUrl: './ess-wizard-page-new.component.html',
  styleUrls: ['./ess-wizard-page-new.component.scss']
})
export class EssWizardPageNewComponent implements OnInit,AfterViewInit{

  form: FormGroup;

  public ckEditorConfigData: any;
  public Editor = ClassicEditor;

  ngOnInit() {
    this.setEditorConfiguration();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._headerService.setCurrentHeaderHeight(170);
    });
  }
    tooltipOptions = {
        'contentType': 'string',
        'placement': 'right',
        'trigger': 'hover',
        'max-width': '450',
        'width': 'auto',
        'pointerEvents': 'auto'
        }


  fileConfiguration: FileConfiguration;
  uxDemoAPPSecurityContext: SecurityContext;

  constructor( public readonly _headerService: HeaderService,private _fuseSidebarService: FuseSidebarService, public _UXDemoDrawerService: UXDemoDrawerService,public gridService: GridService,private readonly _fb: FormBuilder) {
    this.form = this._fb.group({
      dataControl: ['', Validators.compose([Validators.required])],
      dataControl_: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
    })
  }

  public onValidate($event: boolean) {
    // $event will be based on the maxLength validation
  }

  private setEditorConfiguration() {
    this.ckEditorConfigData = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'fontColor',
          'fontSize',
          '|',
          'uploadImage',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          'undo',
          'redo'
        ]
      },
      language: 'en',
      licenseKey: ''
    };
  }

  //table
  displayedColumns: string[] = ['form','weightage','publishDate',  'midtermDue', 'finalDueDate' , 'status' , 'action'];
 
  dataSourceRight = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  //breadcrumbs
  _breadCrumbType = BreadCrumbType;

  breadcrumbs = [
    { title: 'Course offering', route: '/admin/profile/search', order: 0 },
    { title: 'PT509 - Clinical Medicine I', route: '/admin/profile/details/40324c3e-f36b-1410-8d59-00ffffffffff/academics', order: 1 }
  ]

//sidebar options exapand collapse
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }  

  templateList = [
    { value: "Template name 1", viewValue: "Template name 1" },
    { value: "Template name 2", viewValue: "Template name 2" },
    { value: "Template name 3", viewValue: "Template name 3" },
    { value: "Template name 4", viewValue: "Template name 4" }
  ];

  
  signatureList = [
    { value: "Signature name 1", viewValue: "Signature name 1" },
    { value: "Signature name 2", viewValue: "Signature name 2" },
    { value: "Signature name 3", viewValue: "Signature name 3" },
    { value: "Signature name 4", viewValue: "Signature name 4" }
  ];

  // toogle sidebar in small screens
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

    toggleSidebarFolded(): void
    {
        this._fuseSidebarService.getSidebar('ess-page-sidebar').toggleFold();
    }


}




