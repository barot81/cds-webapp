import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuditTrail } from '../../models/audit-trail.model';
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

export class AuditTrailsDrawerComponent implements OnInit {
  auditTrails: AuditTrail[];
  constructor(private patientService: PatientService,
    private _auditTrailService: AuditTrailService) {


  }

  ngOnInit() {
    this.patientService.currentPatient$.pipe(take(1)).subscribe(x=> {
      this._auditTrailService.getAuditTrails(x.id).subscribe((trails) =>{
        this.auditTrails = trails;
      });
    });
  }
}
