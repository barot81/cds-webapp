import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CohortFacade } from '@zhealthcare/cohort/store';
import { FusionFormAdapter, FusionFormComponent } from '@zhealthcare/fusion/components';
import { Logger, OrgFacade } from '@zhealthcare/fusion/core';
import { FeatureMetadataService } from '@zhealthcare/fusion/services';
import { Cohort } from '@zhealthcare/models/cohort';
import { ProfileSecurityContext } from '@zhealthcare/models/profile';
import { AddStudent, AssociatedFaculty, CampusLookup, CategoryLookup, EnrollmentTermLookup, GraduationTermLookup, StudentRegistration } from '@zhealthcare/profile/models';
import { CohortApiClient, ComplianceApiClient, LookupSandbox, PlanCourseApiClient, ProfileApiClient, ProfileSandbox, UniqueEmailValidator } from '@zhealthcare/profile/services';
import { DrawerService, SnackbarService } from '@zhealthcare/ux';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'profile-add-student-form',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent extends FusionFormComponent implements OnInit, FusionFormAdapter, OnDestroy {
  private readonly _unsubscribeAll: Subject<any>;
  facultySelected: boolean;
  newStudentProfile: AddStudent;
  studentRegistration: StudentRegistration;
  associatedFaculty$: AssociatedFaculty;
  associatedFaculty: AssociatedFaculty;
  associatedFacultyList: Array<AssociatedFaculty>;
  selectedcohort: Cohort;
  categoryLookup: CategoryLookup;
  campusLookup: CampusLookup;
  enrollmentTermLookup: EnrollmentTermLookup;
  graduationTermLookup: GraduationTermLookup;
  cohortList: Array<Cohort>;
  SelectedprofileStatus: string = null;
  maxDate: Date;
  mask: (string | RegExp)[];
  profileSecurityContext: ProfileSecurityContext;

  tooltipOptions = {
    contentType: 'string',
    placement: 'left',
    trigger: 'hover',
    theme : 'light',
    'max-width': '300',
    width: '300',
    pointerEvents: 'auto',
  };
  isOptionTruncated(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      const isBig = elem.scrollWidth > elem.clientWidth;
      if (isBig) {
        const optionText = Array.from(
          elem.getElementsByClassName(
            'mat-option-text '
          ) as HTMLCollectionOf<HTMLElement>
        );
        optionText[0].style.overflow = 'hidden !important';
        optionText[0].style.textOverflow = 'ellipsis !important';
        optionText[0].style.display = 'initial !important';
      }
      return isBig;
    } else {
      return false;
    }
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly _snackBarService: SnackbarService,
    public _cohortApiClient: CohortApiClient,
    public _complianceApiClient: ComplianceApiClient,
    private readonly _drawerService: DrawerService,
    private readonly featureService: FeatureMetadataService,
    private readonly _profileAPIClient: ProfileApiClient,
    public _cohortFacade: CohortFacade,
    public orgFacade: OrgFacade,
    public uniqueEmailValidator: UniqueEmailValidator,
    private readonly _lookupSandbox: LookupSandbox,
    public _planCourseApiClient: PlanCourseApiClient,
    private readonly _profileSandbox: ProfileSandbox,
    private readonly _datepipe: DatePipe) {
    super();
    this._unsubscribeAll = new Subject();
    this.facultySelected = false;
    this.associatedFaculty$ = new AssociatedFaculty();
    this.associatedFaculty = new AssociatedFaculty();
    this.associatedFacultyList = new Array<AssociatedFaculty>();
    this.studentRegistration = new StudentRegistration();
    this.selectedcohort = new Cohort;
    this.cohortList = new Array<Cohort>();
    this.categoryLookup = new CategoryLookup();
    this.graduationTermLookup = new GraduationTermLookup();
    this.campusLookup = new CampusLookup();
    this.enrollmentTermLookup = new EnrollmentTermLookup();
    this.newStudentProfile = new AddStudent();

    this.setSecurityContext();
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    this.fusionFormGroup = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', { asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)] }),
      phone: new FormControl(''),
      dateOfBirth: new FormControl(''),
      profileStatus: new FormControl(''),
      enrollment: this.fb.group({
        studentNumber: new FormControl(''),
        cohortId: new FormControl(''),
        cohortName: new FormControl(''),
        enrollmentTermId: new FormControl(''),
        enrollmentTerm: new FormControl(''),
        enrollmentTermDate: new FormControl(''),
        graduationTermId: new FormControl(''),
        graduationTermDate: new FormControl(''),
        graduationTerm: new FormControl(''),
        categoryId: new FormControl(''),
        category: new FormControl(''),
        campusId: new FormControl(''),
        campus: new FormControl(''),
        groupName: new FormControl(''),
        academicStanding: new FormControl(''),
      }),
      associatedFaculties: this.fb.group({
        title: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        fileCollectionKey: new FormControl(''),
        facultyId: new FormControl(''),
        facultyType: new FormControl(''),
        relationShip: new FormControl(''),
        faculty: new FormControl('')
      })
    });

    this.ApplyValdations(this.fusionFormGroup, 'Student.Profile', 'basicInfo')
    this.ApplyValdations(this.fusionFormGroup.controls['enrollment'] as FormGroup, 'Student.Profile', 'enrollment')
  }

  ngOnInit() {
    this._lookupSandbox
      .getCategoryLookup()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this.categoryLookup = res;
      });
    this._lookupSandbox
      .getCampusLookup()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this.campusLookup = res;
      });
    this._lookupSandbox
      .getEnrollmentTermLookup()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this.enrollmentTermLookup = res;
      });
    this._lookupSandbox
      .getGraduationTermLookup()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this.graduationTermLookup = res;
      });
    this.featureService
      .getLookupByName('profilestatus')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        if (res && res.items) {
          this.fusionFormGroup.controls['profileStatus'].setValue(
            res.items[0].itemId
          );
        }
      });

    this.featureService
      .getLookupByName('statusactive')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        if (res && res.items) {
          (this.fusionFormGroup.controls['enrollment'] as FormGroup).controls[
            'academicStanding'
          ].setValue(res.items[0].itemId);
        }
      });

    this._cohortFacade.allCohort$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((cohortList) => {
        if (cohortList !== null && cohortList !== undefined) {
          this.cohortList = cohortList;
        }
      });
    this._profileSandbox.getAssociatedFacultyList().subscribe((response) => {
      if (response !== (null || undefined)) {
        this.associatedFacultyList = response;
      }
    });

    this.fusionFormGroup.controls.email.valueChanges.subscribe((x) => {
      if (this.fusionFormGroup.controls.email.invalid) {
        if (x?.length > 0) {
          this.fusionFormGroup.controls.email.setErrors({ pattern: true });
        } else {
          this.fusionFormGroup.controls.email.setErrors({ required: true });
        }
      }
    });
  }

  OnCohortSelecect(cohort) {
    if (cohort.value !== null && cohort.value !== undefined) {
      this.selectedcohort = this.cohortList.find((x) => x.id === cohort.value);
      (this.fusionFormGroup.controls['enrollment'] as FormGroup).controls[
        'cohortName'
      ].setValue(this.selectedcohort.cohortName);
    }
  }

  OnValueSelect(updatedProperty, property, dateProperty?: any) {
    if (updatedProperty.value !== null && updatedProperty.value !== undefined) {
      switch (property) {
        case 'enrollmentTerm':
          var enrollmentTerm = this.enrollmentTermLookup.enrollmentTerms.find((x) => x.id === updatedProperty.value);
          (this.fusionFormGroup.controls['enrollment'] as FormGroup).controls[property].setValue(enrollmentTerm.name);
          if (dateProperty) {
            (this.fusionFormGroup.controls['enrollment'] as FormGroup).controls[dateProperty].setValue(this._datepipe.transform(enrollmentTerm.termDate, 'MM-dd-yyyy'));
          }
          break;
        case 'graduationTerm':
          var graduationTerm = this.graduationTermLookup.graduationTerms.find((x) => x.id === updatedProperty.value);
          (this.fusionFormGroup.controls['enrollment'] as FormGroup).controls[property].setValue(graduationTerm.name);
          if (dateProperty) {
            (this.fusionFormGroup.controls['enrollment']as FormGroup).controls[dateProperty].setValue(this._datepipe.transform(graduationTerm.termDate, 'MM-dd-yyyy'));
          }
          break;
        case 'category':
          var category = this.categoryLookup.categories.find(
            (x) => x.id === updatedProperty.value
          );
          (this.fusionFormGroup.controls['enrollment'] as FormGroup).controls[
            property
          ].setValue(category.name);
          break;
        case 'campus':
          var campus = this.campusLookup.campuses.find(
            (x) => x.id === updatedProperty.value
          );
          (this.fusionFormGroup.controls['enrollment'] as FormGroup).controls[
            property
          ].setValue(campus.name);
          break;
        default:
        // code block
      }
    }
  }

  onFacultyChange(_faculty) {
    this.facultySelected = true;
    this.associatedFaculty$ = _faculty.value;
    this.setFormValues();
  }

  setFormValues() {
    (
      this.fusionFormGroup.controls['associatedFaculties'] as FormGroup
    ).patchValue(this.associatedFaculty$);
    (
      this.fusionFormGroup.controls['associatedFaculties'] as FormGroup
    ).controls['faculty'].setValue(this.associatedFaculty$);
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
  primaryAction() {
    if (this.fusionFormGroup.invalid) return;
    if (this.fusionFormGroup.value.phone === '') {
      this.fusionFormGroup.get('phone').setValue(null);
    }
    if (this.fusionFormGroup.value.dateOfBirth !== null && this.fusionFormGroup.value.dateOfBirth !== '') {
      this.fusionFormGroup.value.dateOfBirth = this._datepipe.transform(this.fusionFormGroup.value.dateOfBirth, 'yyyy-MM-dd');
    }
    Object.assign(this.newStudentProfile, this.fusionFormGroup.value);
    Object.assign(this.studentRegistration, this.fusionFormGroup.value);
    Object.assign(this.studentRegistration, this.newStudentProfile.enrollment);
    if (this.facultySelected) {
      this.newStudentProfile.associatedFaculties =
        new Array<AssociatedFaculty>();
      (
        this.fusionFormGroup.controls['associatedFaculties'] as FormGroup
      ).removeControl('faculty');
      this.newStudentProfile.associatedFaculties.push(
        Object.assign(
          this.associatedFaculty,
          this.fusionFormGroup.controls['associatedFaculties'].value
        )
      );
    } else {
      this.newStudentProfile.associatedFaculties = null;
    }
    // To disable button On save
    this._drawerService.setPrimaryActionState(false, true);

    this._profileAPIClient
      .addStudentProfile(this.newStudentProfile)
      .subscribe((response) => {
        if (response) {
          this._snackBarService.openCustomSnackBar(
            { message: 'Student Added Successfully.', icon: 'fa-check s-18' },
            3000,
            'snackbar-success'
          );
          // <!--Student Registration in course service-->
          this.studentRegistration.studentId = response?.id;
          this.profileSecurityContext.owningUser = response?.owningUser;
          this.studentRegistration.securityContext =
            this.profileSecurityContext;
            this._profileAPIClient.onStudentAdded.next(true);

          this._planCourseApiClient
            .postStudentProfile(this.studentRegistration)
            .pipe(
              switchMap((data) => {
                return [null];
              }),
              catchError(error => {
                Logger.error(`Error occured in student registration ${error?.toString()}`)
                return of(
                  this._profileAPIClient.onStudentAdded.next(true),
                );
              })
            ).subscribe();
            this._drawerService.closeDrawer()
        }
      });
  }

  setSecurityContext() {
    this.orgFacade.selectedOucode$.pipe(takeUntil(this._unsubscribeAll), map((x) => x?.Oucode)).subscribe((ouCode) => {
        this.profileSecurityContext = new ProfileSecurityContext(localStorage.getItem('TenantId'), '', ouCode);
      });
  }
  secondaryAction() {
    throw new Error('Method not implemented.');
  }

  panelClose() { }
}
