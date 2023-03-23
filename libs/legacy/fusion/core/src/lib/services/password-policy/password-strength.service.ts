import { Injectable } from '@angular/core';
import { Logger } from '../logger/logger.extension';

export enum Criteria {
    at_least_eight_chars,
    at_least_one_lower_case_char,
    at_least_one_upper_case_char,
    at_least_one_digit_char,
    at_least_one_special_char,
}
@Injectable({providedIn: 'any'})
export class PasswordStrengthService {

    containAtLeastEightChars: boolean;
    containAtLeastOneLowerCaseLetter: boolean;
    containAtLeastOneUpperCaseLetter: boolean;
    containAtLeastOneDigit: boolean;
    containAtLeastOneSpecialChar: boolean;
    password: string = "";
    private _strength: number;
    /** five criteria for password validation   **/
    criteriaMap = new Map<Criteria, RegExp>();
    validators: Criteria[] = Object.keys(Criteria).map(key => Criteria[key]);

    constructor() {
        /**For every criteria, set the password against a regular expression. */
        this.criteriaMap.set(Criteria.at_least_eight_chars, RegExp(/^.{8,63}$/));
        this.criteriaMap.set(Criteria.at_least_one_lower_case_char, RegExp(/^(?=.*?[a-z])/));
        this.criteriaMap.set(Criteria.at_least_one_upper_case_char, RegExp(/^(?=.*?[A-Z])/));
        this.criteriaMap.set(Criteria.at_least_one_digit_char, RegExp(/^(?=.*?[0-9])/));
        this.criteriaMap.set(Criteria.at_least_one_special_char, RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/));
    }

    calculatePasswordStrength() {
        const requirements: Array<boolean> = [];
        const unit = 100 / 5;
        requirements.push(
            this._containAtLeastEightChars(),
            this._containAtLeastOneLowerCaseLetter(),
            this._containAtLeastOneUpperCaseLetter(),
            this._containAtLeastOneDigit(),
            this._containAtLeastOneSpecialChar()
        );
        this._strength = requirements.filter(v => v).length * unit;
        // this.onStrengthChanged.next(this.strength);
    }

    getPasswordStrength(password: string = undefined): number {
        if (password !== null && password !== undefined) {
            this.password = password;
        }
        this.calculatePasswordStrength();
        return this._strength;
    }

    isPasswordStrong(password: string = undefined): boolean {
        if (password !== null && password !== undefined) {
            this.password = password;
        }
        this.calculatePasswordStrength();
        return this.strength > 80 ? true : false;
    }

    /**After that, the value of the _strength property will be used to pick the right color for the component (the progress bar): */
    get strength(): number {
        return this._strength ? this._strength : 0;
    }

     /** 1st criteria : contain atleast eight characters*/
    private _containAtLeastEightChars(): boolean {
        this.containAtLeastEightChars = this.password.length >= 8;
        return this.containAtLeastEightChars;
    }

    /** 2nd criteria : contain atleast one LowerCase alphabet */
    private _containAtLeastOneLowerCaseLetter(): boolean {
        this.containAtLeastOneLowerCaseLetter =
            this.criteriaMap
            .get(Criteria.at_least_one_lower_case_char)
            .test(this.password);
        return this.containAtLeastOneLowerCaseLetter;
    }

    /** 3rd criteria : contain atleast one UpperCase alphabet*/
    private _containAtLeastOneUpperCaseLetter(): boolean {
        this.containAtLeastOneUpperCaseLetter =
            this.criteriaMap
            .get(Criteria.at_least_one_upper_case_char)
            .test(this.password);
        return this.containAtLeastOneUpperCaseLetter;
    }

    /** 4th criteria : contain atleast one digit  */
    private _containAtLeastOneDigit(): boolean {
        this.containAtLeastOneDigit =
            this.criteriaMap
            .get(Criteria.at_least_one_digit_char)
            .test(this.password);
        return this.containAtLeastOneDigit;
    }

    /** 5th criteria : contain atleast one special char */
    private _containAtLeastOneSpecialChar(): boolean {
        this.containAtLeastOneSpecialChar =
            this.criteriaMap
            .get(Criteria.at_least_one_special_char)
            .test(this.password);
        return this.containAtLeastOneSpecialChar;
    }

    reset() {
        this._strength = 0;
        this.containAtLeastEightChars =
          this.containAtLeastOneLowerCaseLetter =
          this.containAtLeastOneUpperCaseLetter =
          this.containAtLeastOneDigit =
          this.containAtLeastOneSpecialChar = false;
      }
}
