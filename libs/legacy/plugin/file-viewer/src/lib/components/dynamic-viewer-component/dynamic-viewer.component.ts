import {
  AfterViewInit, Component,
  ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FusionConfigService } from '@zhealthcare/fusion/core';
import { FileSandbox } from '@zhealthcare/plugin/file-upload';
import { DocumentViewerConfiguration } from '../../models/document-viewer-config';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'dynamic-viewer',
  templateUrl: './dynamic-viewer.component.html',
  styleUrls: ['./dynamic-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicViewerComponent implements AfterViewInit {
  file: any;
  index: number;
  selectedIndex = 0;
  objectURL;
  file_name: string;
  documentName;
  SupportedExtensions = ['pdf','doc','docx','pptx','pptm','potx','potm'];

  @ViewChild('vc', { read: ViewContainerRef, static: false })
  vc: ViewContainerRef;
  componentRef;
  constructor(
    private fileService: FileSandbox,
    private route: ActivatedRoute,
    private r: ComponentFactoryResolver,
    private configService: FusionConfigService
  ) {
    this.configService.uiSettings = {
      layout: {
        navbar: {
          hidden: true,
        },
        header: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };
    this.file = new Blob();
    this.documentConfiguration = new DocumentViewerConfiguration();
  }
  ngAfterViewInit(): void {
    this.file.id = this.route.snapshot.queryParams['id'];
    this.file.fileType = this.route.snapshot.queryParams['ft'];
    this.file.fileName = this.route.snapshot.queryParams['fn'];
    this.file.contentType = this.route.snapshot.queryParams['ct'];
    this.documentConfiguration.fileEndpoint = JSON.parse(
      this.route.snapshot.queryParams['doc']
    );
    this.loadFile(this.file, null);
  }

  public fileDescriptions = [];
  pdfSource;
  downloadpdfSource;
  isData = true;
  isNotSupportedFormat = false;
  isLoadedNotSupported = false;
  public _srclist; // private property _item
  @Input() documentConfiguration: DocumentViewerConfiguration;

  loadImageDocument(file_id: string) {
    if (this.vc !== undefined) {
      this.vc.clear();
    }
    this.fileService
      .downloadFile(
        file_id,
        'Original',
        this.documentConfiguration.fileEndpoint,
        true
      )
      .subscribe((Response) => {
        if (Response.type != 0) {
          const factory = this.r.resolveComponentFactory(ImageViewerComponent);
          this.componentRef = this.vc.createComponent(factory);
          (<ImageViewerComponent>this.componentRef.instance).src =
            Response.body;
        }
      });
  }

  loadPdfDocument(file) {
    if (this.vc !== undefined) {
      this.vc.clear();
    }
    var ext = file.fileName.substr(file.fileName.lastIndexOf('.') + 1);
    if (this.SupportedExtensions.includes(ext.toLowerCase())) {
      let fileFormat =
        file.contentType?.toLowerCase() == 'application/pdf'
          ? 'Original'
          : 'PdfFormat';
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
    } else {
      this.isNotSupportedFormat = true;
      this.downloadFile(file.id, file.fileName);
    }
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
  public loadFile(file, index) {
    this.isNotSupportedFormat = false;
    if (file.fileType == 'Document') {
      this.loadPdfDocument(file);
    } else {
      this.loadImageDocument(file.id);
    }

    this.selectedIndex = index;
  }
}
