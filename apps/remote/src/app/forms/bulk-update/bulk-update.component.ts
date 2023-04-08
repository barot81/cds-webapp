/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FusionFormAdapter, FusionFormComponent } from '@zhealthcare/fusion/components';
import { CohortInformation, Enrollment, Profile, BulkUpdateAcademicInfo, CustomProperty } from '@zhealthcare/profile/models';
import { BulkUpdateApiClient, CohortApiClient } from '@zhealthcare/profile/services';
import { ConfirmDialogService, DrawerService } from '@zhealthcare/ux';
import { of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { PatientService } from '../../services/patient.service';

export interface BulkUpdateItem {
  id: string;
  title: string;
  count: number;
}
@Component({
  selector: 'profile-admin-bulk-update-form',
  templateUrl: './bulk-update.component.html'
})
export class BulkUpdateComponent extends FusionFormComponent implements OnInit, FusionFormAdapter, OnDestroy {
  selectedId: string;
  enrollment: Enrollment;
  noChange = "NoChange";
  studentsFromdifferentCohort: boolean;
  selectedStudents: any;
  profileInformation: Profile;
  cohortInformation: CohortInformation;
  SelectedprofileStatus: string = null;
  bulkUpdateList: BulkUpdateItem[] = [
    { id: 'academicInformation', title: 'Academic Information', count: 0 }
  ];

  private readonly _unsubscribeAll: Subject<any>;
  constructor(private readonly fb: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _drawerService: DrawerService,
    private readonly _confirmDialogService: ConfirmDialogService,
    private readonly _bulkUpdateClient: PatientService) {
    super();
    this.selectedId = this.bulkUpdateList[0].id;
    this._unsubscribeAll = new Subject();
    this.enrollment = new Enrollment();
    this.profileInformation = new Profile();
    this.cohortInformation = new CohortInformation();
    this.fusionFormGroup = this.fb.group({
      groupName: [],
      enrollmentTerm: [],
      graduationTerm: [],
      academicStanding: [],
      profileStatus: []
    });
    this.initializeObjects();
    this.fusionFormGroup.patchValue(this.enrollment);
    this.fusionFormGroup.patchValue(this.profileInformation);
    this.fusionFormGroup.markAsPending();
    this.fusionFormGroup.valueChanges.subscribe(values => {
      const updatedCount = Object.values(values).filter(x => x !== this.noChange)?.length;
      this.bulkUpdateList.find(x => x.id === 'academicInformation').count = updatedCount;
      if (updatedCount === 0) {
        this.fusionFormGroup.markAsPending();
      }
    })
  }


  ngOnInit(): void {
    this.selectedStudents = this.data;
    const cohortId = this.selectedStudents[0].cohortId;
    this.studentsFromdifferentCohort = this.selectedStudents.some((x) => x.cohortId !== cohortId);
    if (this.studentsFromdifferentCohort) {
      this.disableCohortSpecificProp()
    } else {
      // this._cohortClient.getCohortInformation(cohortId).pipe(takeUntil(this._unsubscribeAll)).subscribe(cohort => {
      //   this.cohortInformation = cohort;
      // })
    }
  }

  initializeObjects() {
    this.enrollment.enrollmentTerm = this.noChange;
    this.enrollment.groupName = this.noChange;
    this.enrollment.graduationTerm = this.noChange;
    this.enrollment.academicStanding = this.noChange;
    this.profileInformation.profileStatus = this.noChange;
  }

  disableCohortSpecificProp() {
    this.fusionFormGroup.controls['graduationTerm'].disable();
    this.fusionFormGroup.controls['groupName'].disable();
    this.fusionFormGroup.controls['enrollmentTerm'].disable();
  }
  enableCohortSpecificProp() {
    this.fusionFormGroup.controls['graduationTerm'].enable();
    this.fusionFormGroup.controls['groupName'].enable();
    this.fusionFormGroup.controls['enrollmentTerm'].enable();
  }

  onStatusChange(_status) {
    this.SelectedprofileStatus = `status${(_status.value)?.toLowerCase()}`;
    this.fusionFormGroup.controls['academicStanding'].reset();
  }
  navigateToBulkUpdateListItem(id: string) {
    this.selectedId = id;
  }

  reset() {
    this.fusionFormGroup.patchValue(this.enrollment);
    this.fusionFormGroup.patchValue(this.profileInformation);
  }
  primaryAction() {
    if (this.fusionFormGroup.invalid) return;
    if (Object.values(this.fusionFormGroup.value).some(x => x)) {
      const profileBulkUpdate = new BulkUpdateAcademicInfo();
      profileBulkUpdate.studentIds = this.selectedStudents.map(x => x.id);
      this.enableCohortSpecificProp();// enable to get properties from formgroup.
      Object.keys(this.fusionFormGroup.value).forEach(prop => {
        profileBulkUpdate[prop] = new CustomProperty(this.fusionFormGroup.controls[prop].value, this.fusionFormGroup.controls[prop].value === this.noChange ? false : true);
      })

      const message = `All the edited fields will be updated for all the selecetd students!`;
      this._confirmDialogService.open(message, { ok: 'Apply', cancel: 'Cancel', inputCheck: false });
      this._confirmDialogService.confirmDialogAction().subscribe(confirmed => {
        if (confirmed) {
          this._bulkUpdateClient.bulkUpdateAcademicInfo(profileBulkUpdate).pipe(switchMap(data => {
            return [
              this._snackBar.open('Record Updated Successfully.', '', {
                panelClass: ['snackbar-success'],
                duration: 3000,
                verticalPosition: 'top'
              }),
              this._bulkUpdateClient.bulkUpdateCompletionStatus.next(true),
              this._drawerService.closeDrawer(),

            ];
          }), catchError(error => {
            return of(
              this._bulkUpdateClient.bulkUpdateCompletionStatus.next(true),
              this._drawerService.closeDrawer()
            )
          })).subscribe();
        } else {
          this._bulkUpdateClient.bulkUpdateCompletionStatus.next(true);
          this._drawerService.closeDrawer()
        }
      });

    }


  }
  secondaryAction() {
    throw new Error('Method not implemented.');
  }
  panelClose() {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }


}
