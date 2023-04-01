import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExxatComplianceTabNavbarComponent } from './exxat-compliance-tab-navbar.component';
import { MaterialModule } from '@exxat/ux';

@NgModule({
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [ExxatComplianceTabNavbarComponent],
    declarations: [ExxatComplianceTabNavbarComponent],
    providers: [],
  })
  export class ExxatComplianceTabNavBarModule { }
  
