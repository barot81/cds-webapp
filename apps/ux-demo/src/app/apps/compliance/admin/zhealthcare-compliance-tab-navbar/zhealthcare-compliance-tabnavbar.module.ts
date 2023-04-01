import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { zhealthcareComplianceTabNavbarComponent } from './zhealthcare-compliance-tab-navbar.component';
import { MaterialModule } from '@zhealthcare/ux';

@NgModule({
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [zhealthcareComplianceTabNavbarComponent],
    declarations: [zhealthcareComplianceTabNavbarComponent],
    providers: [],
  })
  export class zhealthcareComplianceTabNavBarModule { }
  
