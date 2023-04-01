import { Injectable } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { AddCourseOfferingComponent } from './drawers/add-course-offering/add-course-offering.component';
import { AddCourseMeasuresComponent } from './drawers/add-course-measures/add-course-measures.component';
import { EditCourseMeasureComponent } from './drawers/edit-course-measure/edit-course-measure.component';
import { AddCourseCurriculumComponent } from './drawers/add-course-curriculum/add-course-curriculum.component';
import { AddCourseDetailsComponent } from './drawers/add-course-details/add-course-details.component';
import { AddEventScheduleDrawerComponent } from './drawers/add-event-schedule-drawer/add-event-schedule-drawer.component';
import { AddResourcesDrawerComponent } from './drawers/add-resources-drawer/add-resources-drawer.component';
import { PlanStudentBasicInfoDrawerComponent } from './drawers/plan-student-basic-info-drawer/plan-student-basic-info-drawer.component';
import { AddressInfoDrawerComponent } from './drawers/address-info-drawer/address-info-drawer.component';
import { LicensureInfoDrawerComponent } from './drawers/licensure-info-drawer/licensure-info-drawer.component';
import { CertificationInfoDrawerComponent } from './drawers/certification-info-drawer/certification-info-drawer.component';
import { GeneralEmployementDetailsDrawerComponent } from './drawers/general-employement-details-drawer/general-employement-details-drawer.component';
import { MeasuresDrawersDemoComponent } from './drawers/measures-drawers-demo/measures-drawers-demo.component';
import { ObjectiveDrawerDemoComponent } from './drawers/objective-drawer-demo/objective-drawer-demo.component';
import { ReorderTreeDrawerComponent } from './drawers/reorder-tree-drawer/reorder-tree-drawer.component';
import { AddCAPTEDetailsDrawerComponent } from './drawers/add-capte-details-drawer/add-capte-details-drawer.component';
import { AddCAPTEDetailsDrawerTwoComponent } from './drawers/add-capte-details-drawer-two/add-capte-details-drawer-two.component';
import { AddMappingDrawerComponent } from './drawers/add-mapping-drawer/add-mapping-drawer.component';


@Injectable({providedIn: 'any'})
export class PlanAppDemoDrawerService extends ComponentMap {

    constructor() {

        super();
        this.add('ryzen-add-course-offering', AddCourseOfferingComponent);
        this.add('ryzen-add-course-measures', AddCourseMeasuresComponent);
        this.add('ryzen-edit-course-measure', EditCourseMeasureComponent);
        this.add('ryzen-add-course-curriculum', AddCourseCurriculumComponent);
        this.add('ryzen-add-course-details', AddCourseDetailsComponent);
        this.add('ryzen-add-event-schedule-drawer', AddEventScheduleDrawerComponent);
        this.add('ryzen-add-resources-drawer', AddResourcesDrawerComponent);
        this.add('ryzen-plan-student-basic-info-drawer', PlanStudentBasicInfoDrawerComponent);
        this.add('ryzen-address-info-drawer', AddressInfoDrawerComponent);
        this.add('ryzen-licensure-info-drawer', LicensureInfoDrawerComponent);
        this.add('ryzen-certification-info-drawer', CertificationInfoDrawerComponent);
        this.add('ryzen-general-employement-details-drawer', GeneralEmployementDetailsDrawerComponent);
        this.add('exxat-app-measures-drawers-demo', MeasuresDrawersDemoComponent);
        this.add('exxat-app-objective-drawer-demo', ObjectiveDrawerDemoComponent);
        this.add('exxat-app-reorder-tree-drawer', ReorderTreeDrawerComponent);
        this.add('ryzen-add-capte-details-drawer', AddCAPTEDetailsDrawerComponent);
        this.add('ryzen-add-capte-details-drawer-two', AddCAPTEDetailsDrawerTwoComponent);
        this.add('ryzen-add-mapping-drawer', AddMappingDrawerComponent);






    }
}
