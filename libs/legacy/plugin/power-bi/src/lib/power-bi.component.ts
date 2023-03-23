import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Logger } from '@exxat/fusion/core';
import * as pbi from 'powerbi-client';
import * as powerBiModels from 'powerbi-models';
import { PowerBIService } from './power-bi.service';
@Component({
  selector: 'exxat-plugin-power-bi',
  templateUrl: './power-bi.component.html',
  styleUrls: ['./power-bi.component.scss'],
  providers: [PowerBIService],
})
export class PowerBIComponent implements OnInit, AfterViewInit {
  @Input() reportId;
  @Input() api_link;
  @Input() access;
  @Input() filters: [];
  isAdvancedSearchReport = false;
  tenantId: string;
  tenantName: string;
  report: pbi.Embed;
  loading = true;
  noData = false;
  @ViewChild('reportContainer', { static: false }) reportContainer: ElementRef;
  orgUnitInformation: string;
  selectedOucode: any;

  constructor(
    private http: HttpClient,
    private readonly powerBiService: PowerBIService
  ) {}

  ngOnInit(): void {
    if (this.reportId === '5d45d7a6-fb3d-4108-9753-db9f36176520') {
      this.isAdvancedSearchReport = true;
    }
    this.powerBiService.init();
  }

  ngAfterViewInit(): void {
    this.access
      ? this.accesstokendata(this.access)
      : this.getAccessToken(
          `${this.powerBiService.tenantId}${this.powerBiService.selectedOucode}`
        );
  }

  getAccessToken(id) {
    const tenantinfo = new HttpParams().set('tenentId', id);
    this.http
      .get(this.api_link, {
        params: tenantinfo,
      })
      .subscribe({
        next: (response) => {
          this.noData = false;
          this.accesstokendata(response);
          return response;
        },
        error: (error) => {
          this.noData = true;
          Logger.error(`PowerBI : Error In powerBI report: ${error}`);
        },
      });
  }

  accesstokendata(access: any) {
    this.loading = false;
    this.showReport(
      access[0]?.EmbedTokenvalue ?? access?.embedToken?.token,
      this.reportId
    );
  }

  showReport(Token, reportid) {
    const embedUrl = 'https://app.powerbi.com/reportEmbed'; // Embed URL
    const embedReportId = reportid;
    const config: pbi.IEmbedConfiguration = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken: Token,
      pageView: 'fitToWidth',
      embedUrl: embedUrl,
      id: embedReportId,
      permissions: powerBiModels.Permissions.All,
      settings: {
        layoutType: pbi.models.LayoutType.Custom,
        customLayout: {
          displayOption: pbi.models.DisplayOption.FitToWidth,
        },
        filterPaneEnabled: false,
        navContentPaneEnabled: true,
      },
    };
    config.filters = this.filters;
    const reportContainer = this.reportContainer.nativeElement;

    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );

    powerbi.reset(reportContainer);
    this.report = powerbi.embed(reportContainer, config);

    this.report.off('loaded');

    this.report.on('loaded', () => {
      console.log('Loaded');
    });

    this.report.on('error', () => {
      console.log('Error');
    });
  }
}
