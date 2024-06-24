/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable no-useless-escape */
import { LocationStrategy } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import {
  AuthService,
  BaseComponent,
  FusionConfigService,
  Logger,
  PasswordStrengthService,
  URLConstants,
  UserConsentSandbox,
  UserFacade,
} from '@zhealthcare/fusion/core';
import { FuseMatchMediaService, PageFacade } from '@zhealthcare/ux';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { CohereData, ScholarshipData, SupportData } from '../../helper/events';
import { checkAndRedirectToConsent } from '../../helper/login-flows.helper';
import { IdentitySandbox } from '../../identity.sandbox';
import { UserNameResolver } from '../../services/userName.resolver.service';
import { LoginProvider } from '../sso/models/login-provider.model';
import { CONSTANTS } from './login.constants';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'account-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  // currentBG = new BehaviorSubject<string>('assets/images/bg/1.jpg');
  // $currentBG = this.currentBG.asObservable();
  // Public properties
  _screenSize: string;

  today: number = Date.now();

  _currentDate = Date.now();
  _cohere_reg_start_date = '2023-04-01';
  _cohere_reg_end_date = '2023-10-03';
  _allowRegistration: boolean = false;

  loginForm: FormGroup;
  hide = true;
  loading = false;
  showProgressbar: boolean;
  public show = false;
  errorMessage = false;
  //checking usernames for validation and activation
  usernameInvalid = false;
  usernameInvalidText = '';
  isUsernameActive = true;
  usernameActiveText = '';
  errorMessageText = '';
  x;
  invalidLoginAttempts = 0;
  isLockedOut = false;
  showLoader = true;

  loginAppState = {
    currentState: CONSTANTS.APP_STATE.USERNAME,
  };

  //captcha related declaratons
  siteKey;
  captchaResponse;
  isCapchaVisible = false;

  supportSection = SupportData;
  cohereSection = CohereData;
  scholarshipSection = ScholarshipData;

  private _unsubscribeAll: Subject<any>;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  isInvalid: boolean = false;

  @ViewChild('passwordinput')
  set passwordinput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  @ViewChild('usernameinput')
  set usernameinput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  providers: LoginProvider[];
  user: any;
  credentials: any;
  userName = '';
  constructor(
    private formBuilder: FormBuilder,
    private readonly _matchMediaService: FuseMatchMediaService,
    private userFacade: UserFacade,
    private userNameResolver: UserNameResolver,
    private router: Router,
    private configService: FusionConfigService,
    private pageFacade: PageFacade,
    private identitySandbox: IdentitySandbox,
    private locationStrategy: LocationStrategy,
    private passwordStrengthService: PasswordStrengthService,
    private route: ActivatedRoute
  ) {
    super();
    this.checkForCohereRegistration();
    // this.currentBG = new BehaviorSubject<string>('assets/images/bg/1.jpg');
    // this.$currentBG = this.currentBG.asObservable();
    this._unsubscribeAll = new Subject();
    this.configService.uiSettings = {
      layout: {
        navbar: {
          hidden: true,
        },
        header: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };
    this.preventBackButton();
    this.route.queryParams.subscribe((p) => {
      if (p && Object.keys(p)?.length !== 0) {
        const userName: string = p?.userName;
        if (userName != null) {
          this.userName = userName;
          const existingUser = localStorage.getItem('User');
          if (
            localStorage.getItem('Auth') &&
            existingUser !== null &&
            existingUser !== undefined &&
            JSON.parse(existingUser)?.UserName != null
          ) {
            if (
              userName.toLowerCase() ===
              JSON.parse(existingUser)?.UserName?.toLowerCase()
            ) {
              //User already logged in, redirect to dashboard
              this.router.navigateByUrl('/dashboard');
            } else {
              //User logged in with different user, show error message;
              this.errorMessage = true;
              this.errorMessageText =
                'Already logged in with different user. Make sure to logout and try again';
            }
          } else {
            this.loginForm?.controls['userName']?.setValue(userName);
            this.getProvidersByUsername(userName);
            this.errorMessageText = 'Please enter valid username and password';
          }
        }
      }
    });
  }

  private checkForCohereRegistration(): void {
    const _cohere_reg_start_d = Date.parse(
      new Date(this._cohere_reg_start_date).toLocaleDateString()
    );
    const _cohere_reg_end_d = Date.parse(
      new Date(this._cohere_reg_end_date).toLocaleDateString()
    );

    const _current_d = Date.parse(
      new Date(this._currentDate).toLocaleDateString()
    );

    if (
      _current_d.valueOf() >= _cohere_reg_start_d.valueOf() &&
      _current_d.valueOf() <= _cohere_reg_end_d.valueOf()
    ) {
      this._allowRegistration = true;
    } else {
      this._allowRegistration = false;
    }
  }

  ngOnInit() {
    this.pageFacade.setPageTitle('Login');
    this.loginForm = this.formBuilder.group({
      userName: '',
      password: '',
    });
    if (this.userName !== '') {
      this.loginForm.controls['userName']?.setValue(this.userName);
    }
    const captcha =  this.configService.get('GoogleReCaptcha');
    this.siteKey =captcha?.SiteKey ?? '';

    this._matchMediaService.onMediaChange.subscribe((_screen) => {
      if (_screen && _screen !== null) {
        this._screenSize = _screen;
      }
    });

    this.loginForm.get('password').valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((x) => {
        this.isInvalid = false;
      });
  }
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      if (
        this.router.url ===
          this.configService.appSettings.authGuardSettings.launchUrl ||
        this.router.url ===
          this.configService.appSettings.authGuardSettings.loginUrl
      )
        history.pushState(null, null, location.href);
    });
  }

  public resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }
  login() {
    this.credentials = {
      userName: this.loginForm.controls.userName.value,
      password: this.loginForm.controls.password.value,
      grantType: 'password',
      captchaResponse: this.captchaResponse,
    };

    this.showProgressbar = true;
    if (
      this.credentials.userName === 'vishal' &&
      this.credentials.password === 'Admin@123'
    ) {
      this.userFacade.Login(this.credentials);
      this.UserLoginSuccess();
      this.updateSSOUserFlag();
      if (this.isCurrentApplicationStateUser()) {
        return;
      }
      this.loading = true;

      this.userFacade.UserState$.pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe((data) => {
        setTimeout(() => {
          this.loading = false;
          this.invalidLoginAttempts = parseInt(data.error);
          this.loginValidation(data);
        }, 1500);
      });
    } else {
      this.isInvalid = true;
    }
  }

  loginValidation(data) {
    if (this.invalidLoginAttempts >= 3) {
      this.isCapchaVisible = true;
    }
    if (this.invalidLoginAttempts >= 5) this.isLockedOut = true;
    else this.isLockedOut = false;
    this.errorMessage = data.error ? true : false;
    this.errorMessageText = 'Please enter valid username and password';
    if (this.invalidLoginAttempts >= 4) {
      grecaptcha.reset();
    }
  }

  isCurrentApplicationStateUser() {
    if (this.loginAppState.currentState === CONSTANTS.APP_STATE.USERNAME) {
      this.loginAppState.currentState = CONSTANTS.APP_STATE.PASSWORD;
      return true;
    }
    return false;
  }

  UserLoginSuccess() {
    this.userFacade.UserState$.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (userState) => {
        if (userState && userState.user?.FirstName) {
          if (
            this.credentials &&
            this.credentials.password &&
            this.passwordStrengthService.isPasswordStrong(
              this.credentials.password
            )
          ) {
            checkAndRedirectToConsent(userState, this.router);
          } else {
            // redirect to change passowrd
            Logger.trace(
              `User Effect  => LoginSuccess effect => Password is not strong so redirect to change password page  => User Info: ${JSON.stringify(
                userState?.user
              )} | current Token: ${JSON.stringify(
                userState?.user?.Token
              )} | active Route:${this.route?.url}`
            );
            if (this.credentials && this.credentials.password) {
              this.router.navigateByUrl(URLConstants.Change_Password_URL);
            }
          }
          this.showProgressbar = false;
        }
      }
    );
  }

  private updateSSOUserFlag() {
    this.userFacade.UserState$.pipe(take(1)).subscribe((data) => {
      if (data && data.user) {
        const updatedUser = { ...data.user, isSSOUser: false };
        this.userFacade.updateUserSuccess(updatedUser);
      }
    });
  }

  focus() {
    this.errorMessage = false;
  }

  getProvidersByUsername(input) {
    if (input.length != 0)
      this.identitySandbox.getProviders(input).subscribe(
        (data) => {
          //check username valid or not
          this.usernameInvalid = false;
          //check username active or not
          if (data.errorMsg) {
            this.isUsernameActive = false;
            this.usernameActiveText = data.errorMsg;
          } else {
            this.isUsernameActive = true;
          }
          //normal flow
          this.providers = data?.providerDetails;
          if (data && data.providerDetails && data.providerDetails.length > 0) {
            this.checkssoLogIn();
          } else {
            //check username active or not and change state
            if (this.isUsernameActive === false) {
              this.loginAppState.currentState = 0;
            } else {
              this.loginAppState.currentState = 1;
            }
            this.invalidLoginAttempts = data?.invalidLoginAttempts;
            if (this.invalidLoginAttempts >= 3) this.isCapchaVisible = true;
            if (this.invalidLoginAttempts >= 5) this.isLockedOut = true;
          }
        },
        (error) => {
          this.usernameInvalid = true;
          this.usernameInvalidText = error.error;
        }
      );
  }

  loginClickCheck() {
    const currentState = this.loginAppState.currentState;
    if (currentState === 1) {
      this.login();
    } else {
      this.getProvidersByUsername(this.loginForm.controls.userName.value);
    }
  }

  backButtonState() {
    this.loginAppState.currentState = 0;
    this.usernameInvalid = false;
    this.loginForm.controls['password'].reset();
    this.isCapchaVisible = false;
    this.errorMessage = false;
  }

  redirectToSSO(providerName: string, userName: string) {
    this.loginAppState.currentState = 2;
    this.router.navigate(['/sso/request'], {
      queryParams: { providerName: providerName, userName: userName },
    });
  }

  checkssoLogIn() {
    if (this.providers.length == 1) {
      this.redirectToSSO(
        this.providers[0].providerName,
        this.loginForm.controls.userName.value
      );
    }
  }

  forgotpassword() {
    this.userNameResolver.userName = this.loginForm.controls.userName.value;
    this.router.navigate(['/account/forgetPassword']);
  }

  checkProviders() {
    if (
      this.providers == undefined ||
      this.providers == null ||
      this.providers.length == 0
    )
      return true;
    return false;
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
