import { FoundationInjector } from '@zhealthcare/fusion/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validations } from '@zhealthcare/fusion/models';
import { FeatureMetadataService } from '../feature-metadata.service';


export class FormValidation {
  validations: Validations;
  featureMetadataService:FeatureMetadataService;
  constructor() {
    this.validations = new Validations();
  }

    public ApplyValdations(formGroup: FormGroup, ValidationId: string, formGroupName = "") {
    this.validations = JSON.parse(localStorage.getItem(ValidationId));
    if (this.validations === (undefined || null)) {
      this.featureMetadataService = FoundationInjector.get(FeatureMetadataService);
      this.featureMetadataService.getFormValidatorJson(ValidationId).subscribe(
        data => {
          this.validations = data;
          this.ApplyValidationRules(formGroup,formGroupName);
        }
      );
    } else {
      this.ApplyValidationRules(formGroup,formGroupName);
    }
  }

  public ApplyValidationRules(formGroup: FormGroup, formGroupName:string) {
    this.validations.rules.forEach(validationRule => {
      if (formGroup.contains(validationRule.formControlName) &&
        this.compareFormgroupName(validationRule, formGroupName)) {
        const formControl = formGroup.get(
          validationRule.formControlName
        ) as FormControl;
        const validatorArray = new Array<any>();
        const errorMessages: { [id: string]: string } = {};

        validationRule.validators.forEach(validator => {
          this.ApplyValidationRule(validator, validatorArray, errorMessages);
        });
        formControl.setValidators(validatorArray);
        formControl.updateValueAndValidity();
        formControl['errorMessages'] = errorMessages;
      }
    });
  }

  private compareFormgroupName(validationRule, formGroupName) {
    return (formGroupName === "" || validationRule.formGroupName === (null || undefined) ||
        formGroupName === validationRule.formGroupName);
  }

  public ApplyValidationRule(validator: any, validatorArray, errorMessages ) {
    switch (validator.operator.trim()) {
      case 'Required':
        validatorArray.push(Validators.required);
        errorMessages['required'] = validator.errorMessage;
        break;

      case 'Range':
        if (validator.params.length === 2)
          validatorArray.push(
            Validators.minLength(validator.params[0]),
            Validators.maxLength(validator.params[1])
          );
        errorMessages['minlength'] = validator.errorMessage;
        errorMessages['maxlength'] = validator.errorMessage;
        break;

      case 'EmailAddress':
        validatorArray.push(Validators.email);
        errorMessages['email'] = validator.errorMessage;
        break;

      case 'RegularExpression':
        if (validator.params.length === 1)
          validatorArray.push(Validators.pattern(validator.params[0]));
        errorMessages['pattern'] = validator.errorMessage;

        break;
      case 'StringLength':
        if (validator.params.length === 1)
          validatorArray.push(Validators.max(validator.params[0]));
        errorMessages['max'] = validator.errorMessage;
        break;

      case 'RequiredTrue':
        validatorArray.push(Validators.requiredTrue);
        errorMessages['required'] = validator.errorMessage;
        break;


      default:
        break;
    }
  }
}
