import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { HeaderService } from "@exxat/ux";

export interface RecipientEmailItem {
    type: string;
    email: string;
}

export interface NotificationGridElementItem {
    recipientName: string,
    recipientEmail: RecipientEmailItem,
    subject: string,
    status: string,
    from: string;
    emailSentTime: string;
    scheduleEmail: string;
}

const ELEMENT_DATA: NotificationGridElementItem[] = [
    { recipientName: 'Smith, Will', recipientEmail: { type: 'To', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'In progress', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Cc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'Cc', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'In progress', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Bcc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'To', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Opened', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Cc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'To', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'In progress', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Cc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: '', recipientEmail: { type: 'To', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Link clicked', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Bcc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'Bcc', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'In progress', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Cc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'To', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'In progress', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Cc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'To', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'In progress', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'To', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'To', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Opened', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: '', recipientEmail: { type: 'Cc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'Cc', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'In progress', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'To', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'To', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Link clicked', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Bcc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Smith, Will', recipientEmail: { type: 'Cc', email: 'smith.will@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'In progress', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
    { recipientName: 'Jolie, Angelina', recipientEmail: { type: 'Cc', email: 'angelina.jolie@exxat.com' }, subject: 'Profile for Exxat University student Smith 123', status: 'Delivered', from: 'mohini.shakya@exxat.com', emailSentTime: 'Jun 24, 2021 10:11:24 AM', scheduleEmail: 'No' },
];

@Component({
    selector: 'ryzen-notification-history-grid',
    templateUrl: './notification-history-grid.component.html'
})
export class NotificationHistoryGridComponent implements AfterViewInit {

    @ViewChild('search_bar_filter_container') search_bar_filter_container: ElementRef;
    public search_bar_height: number = 0;
    public settlement_height: number = 28;

    displayedColumns: string[] = ['Recipient_Name', 'Recipient_Email', 'Subject', 'Status', 'From', 'Email_Sent_Time', 'Schedule_Email', 'Action'];

    dataSource = new MatTableDataSource<NotificationGridElementItem>(ELEMENT_DATA);

    /**
     *
     */
    constructor(public readonly _headerService: HeaderService) {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this._headerService.setCurrentHeaderHeight(0);
            if (this.search_bar_filter_container && this.search_bar_filter_container != null) {
                this.search_bar_height = this.search_bar_filter_container.nativeElement.offsetHeight;
            }
        });
    }

    getClass(status: string): string {
        return status.replace(/\s/g, "").trim().toLowerCase();
    }

}