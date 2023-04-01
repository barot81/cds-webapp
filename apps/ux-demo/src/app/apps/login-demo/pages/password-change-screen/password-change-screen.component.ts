import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'ryzen-password-change-screen',
    templateUrl: './password-change-screen.component.html',
})
export class PasswordChangeScreenComponent implements OnInit {

    hide = true;
    hideConfirmPassword = true;
    loginForm: FormGroup;

    tooltipOptions = {
        'contentType': 'template',
        'placement': 'bottom',
        'trigger': 'click',
        'theme': 'light',
        'max-width': '450',
        'width': '377',
        'hide-delay': -1,
        'pointerEvents': 'auto'
    }


    constructor(private readonly _fb: FormBuilder) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.loginForm = this._fb.group(
            {
                newPassword: ['', Validators.required],
                confirmPassword: ['',Validators.required ]
            }
        )
    }
}
