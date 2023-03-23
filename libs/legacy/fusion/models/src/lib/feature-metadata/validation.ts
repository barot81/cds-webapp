export class Validations {
  rules: Array<ValidationRule>;
  tenantId: string;
}

export class ValidationRule {
  propertyName: string;
  formControlName: string;
  formGroupName: string;
  validators: Array<Validator>
}

export class Validator {
  operator: string;
  errorMessage: string;
  params: Array<any>;
}
