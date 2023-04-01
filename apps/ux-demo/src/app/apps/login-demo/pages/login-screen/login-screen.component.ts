import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'ryzen-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

    loginForm: FormGroup;
    hide:boolean = true;

    constructor(private readonly _fb: FormBuilder) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.loginForm = this._fb.group(
            {
                username: [],
                password: []
            }
        )
    }
}