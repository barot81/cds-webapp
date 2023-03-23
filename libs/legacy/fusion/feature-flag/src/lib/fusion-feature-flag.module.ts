import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RemoveIfFeatureOffDirective } from './remove-if-feature-off.directive';
import { RemoveIfFeatureOnDirective } from './remove-if-feature-on.directive';

@NgModule({
  imports: [CommonModule],
  exports: [RemoveIfFeatureOffDirective, RemoveIfFeatureOnDirective],
  declarations: [RemoveIfFeatureOffDirective, RemoveIfFeatureOnDirective],
  providers: [],
})
export class FusionFeatureFlagModule {}
