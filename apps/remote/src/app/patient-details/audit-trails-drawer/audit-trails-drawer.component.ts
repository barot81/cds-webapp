import { Component, Input, OnInit } from '@angular/core';
import { FusionFormAdapter, FusionFormComponent } from '@zhealthcare/fusion/components';
import { take } from 'rxjs/operators';
import { AuditTrail } from '../../models/audit-trail.model';
import { FindingTypes } from '../../models/constants';
import { AuditTrailService } from '../../services/audit-trail.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'audit-trails-drawer',
  templateUrl: 'audit-trails-drawer.component.html',
  styles:[
    `
    .card-border {
      border-left: 2px solid #003322 !important;
      text-align: justify;
      text-justify: inter-word;
    }
    `
  ]
})

export class AuditTrailsDrawerComponent  extends FusionFormComponent
implements OnInit, FusionFormAdapter {
  auditTrails: AuditTrail[];
  @Input() isPdPatient = false;
  constructor(private patientService: PatientService,
    private _auditTrailService: AuditTrailService) {
      super();
  }
  primaryAction() {
  }
  secondaryAction() {
  }
  panelClose() {
  }

  ngOnInit() {
    this.patientService.currentPatient$.pipe(take(1)).subscribe(x=> {
      this._auditTrailService.getAuditTrails(x.id, this.data.isPdPatient ? FindingTypes.Auditor: FindingTypes.Query).subscribe((trails) =>{
        this.auditTrails = trails;
      });
    });
  }
}
