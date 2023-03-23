import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnDestroy, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { DocumentViewerConfiguration } from '../models';

import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserFacade } from '@zhealthcare/fusion/core';
import { FileSandbox } from '@zhealthcare/plugin/file-upload';
import { zhealthcareOverlayRef, HeaderService } from '@zhealthcare/ux';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'zhealthcare-file-viewer',
  templateUrl: './file-viewer.component.html',
  // styleUrls: ['./file-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileViewerComponent implements AfterViewInit, OnDestroy {
  // file viewer
  file: File;
  index: number;
  selectedIndex = 0;
  selectedFileId;
  isFileLoaded: boolean = true;
  objectURL;
  file_name: string;
  documentName;
  SupportedExtensions = ['pdf','doc','docx','pptx','pptm','potx','potm'];

  @ViewChild('vc', { read: ViewContainerRef, static: false })
  vc: ViewContainerRef;
  componentRef;

  public fileDescriptions = [];
  pdfSource;
  downloadpdfSource;
  isData = true;
  isNotSupportedFormat = false;
  isLoadedNotSupported = false;
  public _srclist; // private property _item
  @Input() documentConfiguration: DocumentViewerConfiguration;
  private _unsubscribe: Subject<any>;

  constructor(
    private fileService: FileSandbox,
    private router: Router,
    public headerService: HeaderService,
    private r: ComponentFactoryResolver,
    private userFacade: UserFacade,
    private readonly overlayRef: zhealthcareOverlayRef,
    private changeDetector : ChangeDetectorRef) {
      this._unsubscribe = new Subject();
      this.userFacade.UserState$.pipe(takeUntil(this._unsubscribe)).subscribe((state)=> {
        if(!state.isAuthenticated) {
          this.ngOnDestroy();
        }
      }
    );
  }
  ngOnDestroy(): void {
    if (this.vc !== undefined) {
      this.vc.clear();
    }
    this.overlayRef.close(null);
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    'max-width': 'auto',
    width: 'auto',
    pointerEvents: 'auto',
  };

  isTextOverflow(elementId: string): boolean {
    // debugger;
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.offsetHeight <= elem.scrollHeight - 2;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    if (this.documentConfiguration.fileCollectionKey) {
      this.getDocuments();
    } else {
      this.isData = false;
    }
  }

  public getDocuments(type?) {
    if (type === undefined || type === null) {
      type = 'Original';
    }
    const index: number = 0;
    if (this.documentConfiguration.isKey == false) {
      this.fileDescriptions = this.documentConfiguration.files;
      this.loadDefaultViewer();
    } else {
      this.fileService
        .getFileDescription(
          this.documentConfiguration.fileEndpoint,
          this.documentConfiguration.fileCollectionKey
        )
        .subscribe((Response) => {
          if (Response) {
            this.fileDescriptions = Response.reverse();
            if (this.fileDescriptions.length > 0) {
              this.loadDefaultViewer();
            } else {
              this.isData = false;
            }
          }
        });
    }
  }

  loadDefaultViewer() {
    let index = 0;
    const defaultFileName = this.documentConfiguration.defaultFileName;
    if (this.documentConfiguration.defaultFileName !== '') {
      this.fileDescriptions.filter(function (e, i) {
        if (e.id === defaultFileName) index = i;
        return i;
      });
    }
    this.selectedIndex = index;
    this.loadFile(this.fileDescriptions[index], index);
  }

  loadImageDocument(file_id: string) {
    if (this.vc !== undefined) {
      this.vc.clear();
    }
    this.isFileLoaded = false;
    this.fileService
      .downloadFile(
        file_id,
        'Original',
        this.documentConfiguration.fileEndpoint,
        true
      )
      .subscribe(
        (Response) => {
          if (Response.type != 0) {
            const factory =
              this.r.resolveComponentFactory(ImageViewerComponent);
            this.componentRef = this.vc.createComponent(factory);
            (<ImageViewerComponent>this.componentRef.instance).src =
              Response.body;
            this.isFileLoaded = true;
          }
        },
        (error) => (this.isFileLoaded = true)
      );
  }

  loadPdfDocument(file) {
    if (this.vc !== undefined) {
      this.vc.clear();
    }
    this.isFileLoaded = false;
    var ext = file.fileName.substr(file.fileName.lastIndexOf('.') + 1);
    if (this.SupportedExtensions.includes(ext.toLowerCase())) {
      let fileFormat = file.contentType?.toLowerCase() == "application/pdf" ? 'Original' : 'PdfFormat';

      this.pdfSource = this.fileService.getFileUrl(
        this.documentConfiguration.fileEndpoint,
        file.id,
        fileFormat
        );
      this.downloadpdfSource = this.fileService.getFileUrl(
        this.documentConfiguration.fileEndpoint,
        file.id,
        'Original'
      );
      const factory = this.r.resolveComponentFactory(PdfViewerComponent);
      this.componentRef = this.vc.createComponent(factory);
      (<PdfViewerComponent>this.componentRef.instance).src = this.pdfSource;
      (<PdfViewerComponent>this.componentRef.instance).downloadsrc =
        this.pdfSource;
      this.isFileLoaded = true;
    } else {
      this.isNotSupportedFormat = true;
      this.downloadFile(file.id, file.fileName);
      this.isFileLoaded = true;
    }
  }

  download() {
    this.downloadUrl(this.objectURL, this.file_name);
  }

  downloadUrl(url: string | File, fileName: string) {
    let a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }

  downloadFile(file_id, file_name) {
    this.fileService
      .downloadFile(
        file_id,
        'Original',
        this.documentConfiguration.fileEndpoint,
        true
      )
      .subscribe((Response) => {
        if (Response.type != 0) {
          this.objectURL = URL.createObjectURL(Response.body);
          this.file_name = file_name;
          this.isLoadedNotSupported = true;
        }
      });
  }

  downloadOriginalFile(file_id, file_name, event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileService
      .downloadFile(
        file_id,
        'Original',
        this.documentConfiguration.fileEndpoint,
        true
      )
      .subscribe((Response) => {
        if (Response.type != 0) {
          let url = URL.createObjectURL(Response.body);
          this.downloadUrl(url, file_name);
        }
      });
  }

  public loadFile(file, index) {
    this.isNotSupportedFormat = false;
    this.changeDetector.detectChanges(); // Check if ViewContainerRef is not undefined. #BUG - 83555
    if((this.selectedFileId && this.selectedFileId === file.id) || !this.isFileLoaded ){
      // File already loaded, no need to load it again.  #BUG - 76648
    }
    else{
      this.selectedIndex = index;
      this.selectedFileId = file.id;
      if (file.fileType == 'Document') {
        this.loadPdfDocument(file);
      } else {
        this.loadImageDocument(file.id);
      }
    }
  }

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: File, index: number) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
