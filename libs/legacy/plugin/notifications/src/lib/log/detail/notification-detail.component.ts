import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge ,of as observableOf} from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { NotificationLogModel } from '../../models/notification-log.model';
import { NotifationSandbox } from '../../services/notification.sandbox';

@Component({
  selector: 'exxat-notificationlog-detail',
  templateUrl: './notification-detail.component.html'
})
export class NotificationlogDetailComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description',  'sentAt', 'ttl', 'schedule', 'emailsenttime','events'];
  data: NotificationLogModel[] = [];
   resultsLength = 100;
  isLoadingResults = true;
  isRateLimitReached = false;
  key:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor( private notificationsandbox:NotifationSandbox) { }

  ngOnInit() {
    this.notificationsandbox.GetNotificationibyReferenceKey('9999','fe21afd4-cce0-4834-8000-92597312a4b5').subscribe((response)=>{
console.log(response);

    });
  }


  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.notificationsandbox.GetNotificationibyReferenceKey('sdfdf','fe21afd4-cce0-4834-8000-92597312a4b5');
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

}
