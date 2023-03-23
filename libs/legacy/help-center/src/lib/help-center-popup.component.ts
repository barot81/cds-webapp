import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ZendeskAPIClient } from '@exxat/zendesk';
import { RuntimeConfigLoaderService } from '@exxat-core/angular-runtime-config';
import { FusionFormComponent } from '@exxat/fusion/components';
import {
  EventItem,
  EventsService,
  FusionConfigService,
  OrgFacade,
  UserFacade,
  UserTypeService
} from '@exxat/fusion/core';
import {
  FileCard,
  FileConfiguration,
  FileEndpoint
} from '@exxat/plugin/file-upload';
import { PageFacade, ScrollService, SpinnerOverlayService } from '@exxat/ux';
import lodash from 'lodash';
import moment from 'moment';
import { BehaviorSubject, combineLatest, forkJoin } from 'rxjs';
import { HelpCenterDrawerService } from './services/help-center-drawer.service';

export interface PeriodicElement {
  id: any;
  status: string;
  organization_id: any;
}

@Component({
  selector: 'exxat-help-center-popup',
  templateUrl: './help-center-popup.component.html',
  styleUrls: ['./help-center-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpCenterPopupComponent
  extends FusionFormComponent
  implements OnInit, AfterViewInit
{
  spinnerOverlayService: SpinnerOverlayService;
  error: boolean;
  supportNumber: string;
  _apiHeaders: {
    adminToken: string;
  } | null = null;
  fusionFormGroup: FormGroup;
  exxatHelpForumUrl: string;
  selectedTab = 'user';

  userDetails: any = {
    fullName: '',
    id: '',
    email: '',
    userName: '',
  };
  orgFacadeData: any = {};

  organizationList = [];

  userOrganization: any = {};

  tickets = {
    organizations: [],
    users: [],
    usersAndOrg: [],
  };
  totalCount = 0;
  userType: any;
  dataSource: any;
  searchItem = new FormControl();
  ticketDetails = {};
  displayedColumns = [
    'id',
    'subject',
    'status',
    'description',
    'created_at',
    'updated_at',
  ];
  fileConfiguration!: FileConfiguration;
  helpCenterDrawerService: HelpCenterDrawerService;
  endpoint: string;
  emailToken: any;
  prismChatURL: any;
  filesList: any = [];

  selectedOrg: any = [];

  userDoamin: any = [];
  searchValue: string;
  switchOverInfo: string;
  isFormValid$ = new BehaviorSubject(false);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly userFacade: UserFacade,
    private readonly orgFacade: OrgFacade,
    public configService: FusionConfigService,
    private fb: FormBuilder,
    private readonly userTypeService: UserTypeService,
    public _scrollService: ScrollService,
    private _http: HttpClient,
    private ref: ChangeDetectorRef,
    private pageFacade: PageFacade,
    private _helpCenterDrawerService: HelpCenterDrawerService,
    spinnerOverlayService: SpinnerOverlayService,
    private _runtimeConfigLoaderService: RuntimeConfigLoaderService,
    private _eventsService: EventsService,
    private _zendeskAPIClient: ZendeskAPIClient,
    private _orgFacade: OrgFacade
  ) {
    super();
    this.helpCenterDrawerService = _helpCenterDrawerService;
    this.spinnerOverlayService = spinnerOverlayService;
    const runtimeAppConfig =
      _runtimeConfigLoaderService.getConfig().appSettings;
    this.prismChatURL = runtimeAppConfig?.services?.prismChatURL?.endpoint;
    this.pageFacade.setPageTitle('Help');
    this.prepareFileObject();
    this.error = false;
    this.supportNumber = this.configService.getservice(
      'help.center.supportNumber'
    ).endpoint;
    this.fusionFormGroup = this.fb.group({
      subject: new FormControl('', [Validators.required]),
      askQuestion: new FormControl('', [Validators.required]),
    });
    this.userType = this.userTypeService.getUserType();
    this.switchOverInfo = runtimeAppConfig?.helpCenterSettings?.switchOverInfo;
  }

  ngOnInit() {
    this.userFacade.UserState$.subscribe(async (state: any) => {
      if (state) {
        this.userDetails.fullName =
          state?.user?.LastName !== null && state?.user?.LastName !== ''
            ? `${state?.user?.LastName}, ${state?.user?.FirstName}`
            : state?.user?.FirstName;
        this.userDetails.email = state?.user?.Email;
        this.userDetails.id = state?.user?.Id;
        this.userDetails.userName = state?.user?.UserName;
      }
    });

    this.orgFacade.OrgState$.subscribe((state: any) => {
      if (state) {
        this.orgFacadeData = state;
        this.selectedOrg =
          state.TenantWithOuCodeTree &&
          state.TenantWithOuCodeTree.OucodeTree &&
          state.TenantWithOuCodeTree.OucodeTree.filter(
            (o: any) => o.isSelected
          );
        this.userDoamin =
          this.selectedOrg.length > 0
            ? [this.selectedOrg[0].fullName, this.selectedOrg[0].Oucode]
            : [];
      }
    });
    this.onStatusChangeListener();
  }

  onStatusChangeListener() {
    this.fusionFormGroup?.statusChanges.subscribe((status) => {
      this.isFormValid$.next(status === 'VALID' ? true : false);
    });
  }

  prepareFileObject() {
    this.fileConfiguration = new FileConfiguration();
    this.fileConfiguration.fileEndpoint = new FileEndpoint(
      'student.profile',
      'help-center'
    );
    this.fileConfiguration.fileCards = [];
    const fileCard = new FileCard();
    fileCard.filePath = 'helpCenterDocument';
    this.fileConfiguration.fileCards.push(fileCard);
  }

  async onSubmit() {
    this.spinnerOverlayService.show();
    this.getOrganizationList(false);
  }

  getOrganizationList(onload: boolean) {
    if (onload) {
      this.getTicketList();
    } else {
      this.checkIfUserExists();
    }
  }

  checkIfUserExists() {
    this._zendeskAPIClient
      .user(this.userDetails.email)
      .subscribe((response: any) => {
        if (response.users && response.users.length > 0) {
          this.uploadFileIfAtatched();
        } else {
          this.createUser();
          this.uploadFileIfAtatched();
        }
      });
  }

  createUser() {
    this._zendeskAPIClient
      .createUser({
        user: {
          verified: true,
          email: this.userDetails.email,
          name: this.userDetails.fullName,
          active: true,
          identities: [
            {
              type: 'email',
              value: this.userDetails.email,
            },
            {
              type: 'name',
              value: this.userDetails.fullName,
            },
            {
              type: 'id',
              value: `${this.userDetails.id}`,
            },
          ],
          ticketRestriction: 'requested',
          tags: [
            'Prism',
            'Student',
            'prism_v4',
            this.orgFacadeData.TenantWithOuCodeTree.TenantId,
            ...this.userDoamin,
          ],
        },
      })
      .subscribe();
  }

  uploadFileIfAtatched() {
    if (this.filesList.length > 0) {
      const promises: any = [];
      let headers = new HttpHeaders();

      combineLatest(
        this.userFacade.AuthState$,
        this._orgFacade.selectedOucode$,
        this._orgFacade.selectedTenant$
      ).subscribe(([tokenModel, selectedOucode, selectedTenant]) => {
        const token = tokenModel.accessToken;
        if (token && selectedOucode && selectedTenant) {
          headers = headers
            .append('Authorization', 'Bearer ' + token)
            .append('TenantId', selectedTenant)
            .append('Oucodes', selectedOucode.Oucode);

          lodash.forEach(this.filesList, (file: any) => {
            const fd = new FormData();
            fd.append('filePayload', file.data);
            promises.push(
              this._http.post(
                this.prismChatURL + `upload?fileName=${file.name}`,
                fd,
                { headers }
              )
            );
          });

          forkJoin(promises).subscribe((res: any) => {
            const tokens = res.map((x: any) => x.upload.token);
            this.createTicket(tokens);
          });
        }
      });
    } else {
      this.createTicket(null);
    }
  }

  createTicket(files: any) {
    const ticket = {
      request: {
        type: null,
        status: null,
        subject: this.fusionFormGroup.value.subject,
        description: null,
        requester_id: null,
        requester: {
          name: this.userDetails.fullName,
          email: this.userDetails.email,
        },
        custom_fields: [
          {
            id: 11360540932241,
            value: 'Prism',
            Values: null,
          },
          {
            id: 11360279530129,
            value: 'Prism',
          },
          {
            id: 11360668301329,
            value: this.userDetails.email,
            Values: null,
          },
          {
            id: 11360461467153,
            value: this.userDetails.fullName,
            Values: null,
          },
          {
            id: 11361468918417,
            value: moment().add(3, 'days').format('YYYY-MM-DD'),
          },
        ],
        comment: {
          id: null,
          type: null,
          body: this.fusionFormGroup.value.askQuestion,
          html_body: null,
          plain_body: null,
          uploads: files,
          attachments: null,
        },
        tags: ['Prism', 'Student', 'prism_v4', ...this.userDoamin, this.orgFacadeData.TenantWithOuCodeTree.TenantId],
      },
    };
    this._zendeskAPIClient.createRequest(ticket).subscribe((response: any) => {
      this.clearTicketForm();
      if (this.selectedTab === 'user') {
        this.ticketListByUser();
      } else {
      }
    });
  }

  clearTicketForm() {
    this.fusionFormGroup.reset();
    const eventItem: EventItem = { payload: {} };
    this._eventsService.publish('clear_files_uploaded', eventItem);
  }

  ticketListByUser() {
    this.spinnerOverlayService.show();
    this.selectedTab = 'user';
    this._zendeskAPIClient.getRequests().subscribe({
      next: (response: any) => {
        this.tickets.users = response.requests;
        this.totalCount = response.count;
        this.dataSourseMapping(this.tickets.users);
        this.error = false;
        this.spinnerOverlayService.hide();
      },
      error: () => {
        this.error = true;
        this.spinnerOverlayService.hide();
      },
    });
  }

  filterCustomField(request: any, fieldId: any) {
    const fieldValue = request.custom_fields.filter((field: any) => {
      if (field.id == fieldId && field.value) {
        return field.value;
      }
    });

    return fieldValue && fieldValue.length > 0 ? fieldValue[0] : '';
  }

  dataSourseMapping(requests: any) {
    const data: any = [];
    lodash.map(requests, (request) => {
      const createdBy = this.filterCustomField(request, 11360461467153);
      const emailId = this.filterCustomField(request, 11360668301329);
      data.push({
        id: request.id,
        subject: request.subject,
        status: request.status,
        description: request.description,
        createdBy: createdBy,
        emailId: emailId,
        created_at: moment(request.created_at).format('MMM D, YYYY'),
        updated_at: moment(request.updated_at).format('MMM D, YYYY'),
      });
    });
    data.reverse();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.ref.markForCheck();
    this.spinnerOverlayService.hide();
  }

  async ngAfterViewInit() {
    this.getOrganizationList(true);
  }

  getTicketList() {
    this.ticketListByUser();
  }

  onUploadFiles(files: any) {
    this.filesList = files;
  }

  deleteFile(item: any, i: any) {
    this.filesList.splice(i, 1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  clearSearch() {
    this.searchValue = '';
    this.ticketListByUser();
  }
}
