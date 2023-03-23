/* eslint-disable no-empty */
/* eslint-disable @angular-eslint/component-selector */
import {
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrgFacade } from '@zhealthcare/fusion/core';
import { TimezonePipe } from '@zhealthcare/fusion/pipes';
import { FlexTableService, HeaderService } from '@zhealthcare/ux';
import lodash from 'lodash';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Display } from '../models/display.model';
import { NotificationLogConfig } from '../models/notification-log-config.model';
import { NotificationLogModel } from '../models/notification-log.model';
import { DrawerService } from '../services/drawer-service';
import { NotifationSandbox } from '../services/notification.sandbox';
import { NotificationLogDetailService } from '../services/notificationlog.detail.service';

@Component({
  selector: 'zhealthcare-notification-log',
  templateUrl: './notification-log.component.html',
  styleUrls: ['./notification-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationLogComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @ViewChild('search_bar_filter_container')
  search_bar_filter_container: ElementRef;
  public search_bar_height = 0;
  public settlement_height = 28;

  data: NotificationLogModel[] = [];
  @Input() notificationLogConfig: NotificationLogConfig;
  displayedColumns: string[] = [
    'recipientName',
    'recipientEmail',
    'subject',
    'status',
    'fromemail',
    'sentAt'
  ];

  public isLoadingResults = new BehaviorSubject<boolean>(null);
  isLoadingResults$ = this.isLoadingResults.asObservable();
  isRateLimitReached = false;
  timerSubscription: any;
  @ViewChild(MatSort) sort: MatSort;
  emailRowList: any = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchValue = '';

  pageNumber = 1;
  logCount = 0;
  dataSource = new MatTableDataSource<any>();

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto'
  };

  public ouCode;
  rows = [];
  constructor(
    private notificationsandbox: NotifationSandbox,
    public _orgFacade: OrgFacade,
    public notificationlogformservice: NotificationLogDetailService,
    public headerService: HeaderService,
    public drawerService: DrawerService,
    private readonly _flexTableService: FlexTableService,
    private cdr: ChangeDetectorRef,
    private readonly _timeZonePipe: TimezonePipe
  ) {}
  initiateRows(): Observable<any[]> {
    this.dataSource.data.forEach((element) => {
      this.rows.push(element, { detailRow: true, element });
    });
    return of(this.rows);
  }

  getNotificationlogByLoad() {
    this.dataSource.data = [];
    this.rows = [];
    this.loadData(this.pageNumber);
  }

  applySearch($event: KeyboardEvent) {
    if (
      $event.key === 'Enter' ||
      $event.type === 'click' ||
      ($event.key === 'Backspace' && this.searchValue.trim().length === 0)
    ) {
      this.isLoadingResults.next(true);
      this.cdr.detectChanges();
      this.searchValue = this.searchValue.trim(); // Remove whitespace
      this.pageNumber = 1;
      this.getNotificationlogByLoad();
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    this.isLoadingResults.next(true);
    if (this.notificationLogConfig.showScheduled)
      this.displayedColumns.push('isScheduled');
  }

  onScroll(event) {
    try {
      const top = event.target.scrollTop;
      const height = event.target.scrollHeight;
      const offset = event.target.offsetHeight;
      if (top > height - offset - 1) {
        this.isLoadingResults
          .subscribe((isLoaded) => {
            if (!isLoaded && this.logCount >= 50) {
              const pageNumber = this.pageNumber + 1;
              this.pageNumber = pageNumber;
              this.loadData(pageNumber);
            }
          })
          .unsubscribe();
      }
    } catch (err) {}
  }

  loadData(pageNumber: number) {
    let filter = '';
    filter = this.notificationLogConfig?.notificationId
      ? filter.length > 0
        ? filter +
          " and notificationId eq '" +
          this.notificationLogConfig.notificationId +
          "' "
        : "notificationId eq '" +
          this.notificationLogConfig.notificationId +
          "' "
      : filter;
    filter = this.notificationLogConfig?.categoryId
      ? filter.length > 0
        ? filter +
          " and categoryId eq '" +
          this.notificationLogConfig.categoryId +
          "' "
        : "categoryId eq '" + this.notificationLogConfig.categoryId + "' "
      : filter;
    filter = this.notificationLogConfig?.eventName
      ? filter.length > 0
        ? filter +
          " and eventName eq '" +
          this.notificationLogConfig.eventName +
          "'"
        : "eventName eq '" + this.notificationLogConfig.eventName + "' "
      : filter;
    filter = this.notificationLogConfig?.groupId
      ? filter.length > 0
        ? filter +
          " and groupId eq '" +
          this.notificationLogConfig.groupId +
          "' "
        : "groupId eq '" + this.notificationLogConfig.groupId + "'"
      : filter;
    filter = this.notificationLogConfig?.fromEmail
      ? filter.length > 0
        ? filter +
          " and from.email eq '" +
          this.notificationLogConfig.fromEmail +
          "'"
        : "from.email eq '" + this.notificationLogConfig.fromEmail + "' "
      : filter;
    filter = this.notificationLogConfig?.cohortId
      ? filter.length > 0
        ? filter +
          " and cohortId eq '" +
          this.notificationLogConfig.cohortId +
          "'"
        : "cohortId eq '" + this.notificationLogConfig.cohortId + "' "
      : filter;
    filter = this.notificationLogConfig?.startDate
      ? filter.length > 0
        ? filter + ' and sentAt  ge ' + this.notificationLogConfig.startDate
        : 'sentAt  ge ' + this.notificationLogConfig.startDate + ' '
      : filter;
    filter = this.notificationLogConfig?.endDate
      ? filter.length > 0
        ? filter + ' and sentAt  le ' + this.notificationLogConfig.endDate
        : 'sentAt  le ' + this.notificationLogConfig.endDate
      : filter;
    filter = this.notificationLogConfig?.notificationIdStartsWith
      ? filter.length > 0
        ? filter +
          " and startswith(notificationId, '" +
          this.notificationLogConfig.notificationIdStartsWith +
          "') "
        : "startswith(notificationId, '" +
          this.notificationLogConfig.notificationIdStartsWith +
          "') "
      : filter;

    this.notificationsandbox
      .GetEmailHistoryByFilter(
        this.ouCode,
        filter,
        'sentAt desc',
        this.pageNumber,
        50,
        this.searchValue.length > 2 ? this.searchValue : ' '
      )
      .subscribe((res) => {
        if (res) {
          this.isLoadingResults.next(true);

          this.logCount = res.length;
          const resultLog = res;
          let resLog = [];
          this.setDefaultLogStatus(resultLog, resLog);

          if (pageNumber !== 1) {
            const oldLogs = this.dataSource.data;
            resLog = oldLogs.concat(resLog);
          } else {
            this.dataSource.data = [];
          }
          this.rows = [];
          this.dataSource = new MatTableDataSource(resLog);
          const sortvariable1: any = { active: 'sentAt', direction: 'desc' };
          this.sort.active = sortvariable1.active;
          this.sort.direction = sortvariable1.direction;
          this.dataSource.sort = this.sort;
          this.sort.sortChange.emit(sortvariable1);

          this.cdr.detectChanges();
        }
        this.isLoadingResults.next(false);
      });
  }

  setDefaultLogStatus(resultLog: NotificationLogModel[], resLog: any[]) {
    resultLog.forEach((val, i) => {
      const LogArr = [];

      val.to.forEach((res, j) => {
        let evtArr = [];
        if (Array.isArray(val.events))
          evtArr = val.events.filter(
            (ev) => ev.email.toLowerCase() === res.email.toLowerCase()
          );
        this.prepareLogPayload(LogArr, evtArr, res, val, resLog, j, false);
      });
      if (!lodash.isNull(val.cC)) {
        val.cC.forEach((res, j) => {
          let evtArr = [];
          if (Array.isArray(val.events))
            evtArr = val.events.filter(
              (ev) => ev.email.toLowerCase() === res.email.toLowerCase()
            );
          this.prepareLogPayload(LogArr, evtArr, res, val, resLog, j, true);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnChanges() {
    this._orgFacade.selectedOucode$.subscribe((x) => {
      this.ouCode = x.Oucode;
    });
    this.pageNumber = 1;
    this.dataSource.data = [];
    this.dataSource = new MatTableDataSource([]);
    this.cdr.detectChanges();
    this.isLoadingResults.next(true);
    this.getNotificationlogByLoad();
  }

  private GetDisplayStatusByEventStatus(eventStatus: string) {
    const display: any = { displayStatus: 'none', description: 'none' };
    switch (eventStatus) {
      case Display.event_inProgress:
        display.displayStatus = Display.display_inProgress;
        display.description = Display.des_inProgress;
        break;
      case Display.event_delivered:
        display.displayStatus = Display.display_delivered;
        display.description = Display.des_delivered;
        break;
      case Display.event_opened:
        display.displayStatus = Display.display_opened;
        display.description = Display.des_opened;
        break;
      case Display.event_linkClicked:
        display.displayStatus = Display.display_linkClicked;
        display.description = Display.des_linkClicked;
        break;
      case Display.event_bounced:
        display.displayStatus = Display.display_bounced;
        display.description = Display.des_bounced;
        break;
      case Display.event_delayed:
        display.displayStatus = Display.display_delayed;
        display.description = Display.des_delayed;
        break;
      case Display.event_dropped:
        display.displayStatus = Display.display_dropped;
        display.description = Display.des_dropped;
        break;
      default:
        display.displayStatus = 'none';
        display.description = 'none';
    }
    return display;
  }

  private prepareLogPayload(
    LogArr: any,
    evtArr: any,
    res: any,
    val: any,
    resLog: any,
    j: number,
    iscc: boolean
  ) {
    if (evtArr != null) evtArr = this.GetLatestEvent(evtArr);
    LogArr.push({
      email: res.email,
      eventStatus:
        evtArr.length > 0 ? evtArr[0].name : Display.event_inProgress,
      displayStatus:
        evtArr.length > 0
          ? evtArr[0].displayStatus
          : Display.display_inProgress,
      recepientname: res.name,
      description:
        evtArr.length > 0 ? evtArr[0].description : Display.des_inProgress
    });
    if (lodash.isEmpty(LogArr[LogArr.length - 1].displayStatus)) {
      const ans = this.GetDisplayStatusByEventStatus(
        LogArr[LogArr.length - 1].eventStatus
      );
      LogArr[LogArr.length - 1].displayStatus = ans.displayStatus;
      LogArr[LogArr.length - 1].description = ans.description;
    }
    const result = LogArr[LogArr.length - 1].description.match(
      /(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2})/
    );
    if (result != null) {
      LogArr[LogArr.length - 1].description = LogArr[
        LogArr.length - 1
      ].description.replace(
        /(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2})/,
        this._timeZonePipe.transform(
          evtArr[0].timeStamp + 'Z',
          'MMM d, yyyy h:mm a'
        )
      );
    }
    resLog.push({
      fromemail: val.from.email,
      recipientName: iscc == true ? val.cC[j].name : val.to[j].name,
      recipientEmail: iscc == true ? val.cC[j].email : val.to[j].email,
      subject: val.subject,
      status: LogArr[LogArr.length - 1].displayStatus,
      description: LogArr[LogArr.length - 1].description,
      sentAt: val.sentAt,
      isScheduled: val.isScheduled,
      body: val.body,
      attachmentsFileDescription: val.attachmentsFileDescription,
      iscc: iscc
    });
  }

  GetLatestEvent(evtArr: any) {
    const arr = evtArr.filter((x) => x.name === Display.event_linkClicked);
    if (evtArr.filter((x) => x.name === Display.event_opened).length > 0)
      arr.push(evtArr.filter((x) => x.name === Display.event_opened)[0]);
    if (evtArr.filter((x) => x.name === Display.event_delivered).length > 0)
      arr.push(evtArr.filter((x) => x.name === Display.event_delivered)[0]);
    if (evtArr.filter((x) => x.name === Display.event_bounced).length > 0)
      arr.push(evtArr.filter((x) => x.name === Display.event_bounced)[0]);
    if (evtArr.filter((x) => x.name === Display.event_dropped).length > 0)
      arr.push(evtArr.filter((x) => x.name === Display.event_dropped)[0]);
    if (evtArr.filter((x) => x.name === Display.event_delayed).length > 0)
      arr.push(evtArr.filter((x) => x.name === Display.event_delayed)[0]);
    if (evtArr.filter((x) => x.name === Display.event_inProgress).length > 0)
      arr.push(evtArr.filter((x) => x.name === Display.event_inProgress)[0]);
    return arr;
  }

  ngAfterViewInit() {
    this._flexTableService.TriggerChangeDetection(true);
    setTimeout(() => {
      this.headerService.setCurrentHeaderHeight(0);
      if (
        this.search_bar_filter_container &&
        this.search_bar_filter_container != null
      ) {
        this.search_bar_height =
          this.search_bar_filter_container.nativeElement.offsetHeight;
      }
    });
  }

  getClass(status: string): string {
    return status.replace(/\s/g, '').trim().toLowerCase();
  }
}
