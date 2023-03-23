/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FusionConfigService, OrgFacade } from '@zhealthcare/fusion/core';



@Component({
	selector: 'pdf-viewer',
	templateUrl: './pdf-viewer.component.html',
	styleUrls: [ './pdf-viewer.component.scss' ],
})
export class PdfViewerComponent implements OnInit, OnDestroy {
 currentPdfLink;
 downloadPdfLink;
 public  _Auth:string;
 public _Oucodes:string;
 public  _TanentId:string;
 private _unsubscribe: Subject<any>;
 @ViewChild('viewer', { static: false }) public embeddedPdfViewer;
 isPdfLoaded = false;
 zoom = 'auto';

 set src(input: string) {
  this.currentPdfLink = this.getEndpoint(input);

}
public get pdfSrc() {
  return this.currentPdfLink;
}
 set downloadsrc(input:string) {
  this.downloadPdfLink = this.getEndpoint(input);
}


private geGatewayUrl(): string {
  return this.configService.appSettings.gateway.endpoint;
}

private getEndpoint(targetUrl: string) {
  targetUrl = (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) ? targetUrl : (this.geGatewayUrl() != "" ? this.geGatewayUrl() + targetUrl : targetUrl);
  return targetUrl;
}

constructor(readonly cdr:ChangeDetectorRef, private orgFacade:OrgFacade, private configService: FusionConfigService) {
    this._unsubscribe = new Subject();
  }

	ngOnInit() {

    const AuthData = (sessionStorage.getItem("IsDelegateUser") === 'true')?JSON.parse(sessionStorage.getItem('Auth')):JSON.parse(localStorage.getItem('Auth'));
    this._Auth='Bearer '+AuthData['accessToken'];
    this.orgFacade.selectedOucode$.pipe(
      takeUntil(this._unsubscribe)).subscribe(x=>this._Oucodes = x.Oucode);

    this._TanentId=(sessionStorage.getItem("IsDelegateUser") === 'true') ? sessionStorage.getItem('TenantId'): localStorage.getItem('TenantId');
    this.cdr.detectChanges();
    this.embeddedPdfViewer.refresh();
  }
  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
  pdfLoaded() {
      this.isPdfLoaded = !this.isPdfLoaded;
    }

}
