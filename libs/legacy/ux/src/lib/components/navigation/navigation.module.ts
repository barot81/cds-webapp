import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FeatureMetaDataPipesModule } from '@zhealthcare/fusion/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { FusionNavCollapsableComponent } from './menu-components/collapsable/collapsable.component';
import { FusionNavGroupComponent } from './menu-components/group/group.component';
import { FusionNavItemComponent } from './menu-components/item/item.component';
import { FusionNavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,
    FeatureMetaDataPipesModule,
    TranslateModule.forChild(),
  ],
  exports: [FusionNavigationComponent],
  declarations: [
    FusionNavigationComponent,
    FusionNavItemComponent,
    FusionNavCollapsableComponent,
    FusionNavGroupComponent,
  ],
})
export class FusionNavigationModule {}
