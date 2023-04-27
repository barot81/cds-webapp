import { NgModule } from '@angular/core';
import { Bootstrap } from '@exxat/bootstrap';
import { DetailsRoutingModule } from './admin/details/details-routing.module';
import { AppComponent } from './app.component';
import { AcademicStudentInfoRoutingModule } from './student/academics/academics-routing.module';
import { InterventionLogRoutingModule } from './admin/intervention-log/intervention-log-routing.module';
import { ProfileLeaningActivitiesRoutingModule } from './admin/learning-activities/learning-activities-routing.module';
import { StudentCommunicationRoutingModule } from './admin/student-communication/student-communication-routing.module';
import { ContactRoutingModule } from './admin/student-info/contact/contact-routing.module';
import { StudentInfoRoutingModule } from './admin/student-info/student-info-routing.module';
import { RouterModule } from '@angular/router';
import { AcademicsRoutingModule } from './admin/academics/academics-routing.module';
import { LeaningActivitiesModule } from './admin/learning-activities';
@NgModule({
  imports: [
    Bootstrap,
    RouterModule,
    AcademicStudentInfoRoutingModule,
    DetailsRoutingModule,
    InterventionLogRoutingModule,
    ProfileLeaningActivitiesRoutingModule,
    StudentCommunicationRoutingModule,
    ContactRoutingModule,
    StudentInfoRoutingModule,
    AcademicsRoutingModule,
    LeaningActivitiesModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
