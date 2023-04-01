import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@exxat/ux'
import { NotificationService } from './services/navigation.service';
import { NotificationService as emailservice, NotificationEmailFormModel } from '@exxat/plugin/notifications';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'exxat-app-profile',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  searchText: string;
  emailData;
  data=[];
  showData:NotificationEmailFormModel;
  destroy$: Subject<boolean> = new Subject<boolean>();
  //documentConfiguration :DocumentViewerConfiguration;
  /**
   * Constructor
   *
   * @param {FuseSidebarService} _fuseSidebarService
   */
  constructor( private _fuseSidebarService: FuseSidebarService,
                public notificationservice:NotificationService,
                 public notificationserviceemail:emailservice)
                 {

                 }

  ngOnInit() {

    this.notificationserviceemail.emailStepCompletionSatus$
    .pipe(takeUntil(this.destroy$))
    .subscribe(reponse=>{
      this.getNotificationData();
      this.showData=this.emailData;
    //  console.log(reponse);
    });
  }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
    getNotificationData(){
      this.notificationserviceemail.notificationData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(reponse=>{
          this.emailData=reponse;
      });
    }
  /* checkStep(event){

     if(event=='3'){
      this.notificationserviceemail.notificationData$.subscribe(reponse=>{


      });

     }
    } */

}
