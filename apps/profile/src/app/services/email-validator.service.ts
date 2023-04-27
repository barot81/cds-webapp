import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProfileApiClient } from "./profile.service";
@Injectable({providedIn: 'any'})
export class UniqueEmailValidator implements AsyncValidator {
    intialValue: string;
    constructor(private readonly _profileAPIClient: ProfileApiClient) { }

    validate(
        control: AbstractControl
    ): Observable<ValidationErrors | null> {

        return this._profileAPIClient.checkUserExistByUserNames(control.value).pipe(
            map(isTaken => this.getValidationError(isTaken[control.value], control)),
            catchError(() => of(null))
        );
    }

    getValidationError(isTaken: boolean, control: AbstractControl): ValidationErrors | null {
        if (control.value === this.intialValue) {
            return null;
        }
        if (isTaken) {
            return { email: true }
        }
        return null;
    }
}

