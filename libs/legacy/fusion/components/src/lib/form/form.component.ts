import { FormGroup } from '@angular/forms';
import { Validations } from '@zhealthcare/fusion/models';
import { FeatureMetadataService, FormValidation } from '@zhealthcare/fusion/services';

export class FusionFormComponent {
  data: any;
  key: string;
  routeParam: any;
  fusionFormGroup: FormGroup;
  formValidation : FormValidation = new FormValidation();
  validations: Validations;
  featureMetadataService: FeatureMetadataService;

  constructor() {
    this.fusionFormGroup = new FormGroup({});
    this.validations = new Validations();

  }

  public ApplyValdations(formGroup: FormGroup, validationId: string, formGroupName = "") {
    this.formValidation.ApplyValdations(formGroup, validationId, formGroupName);
  }
}
