import { Router } from '@angular/router';
import { AuthService, Logger, URLConstants, MetaConstants, UserConsentSandbox  } from '@exxat/fusion/core';
import { UserPersona } from '@exxat/fusion/models';

export function getLaunchUrl(userState) {
  return `${userState?.user?.UserRoles.filter(x => x.UserType === UserPersona.Student && !x.RoleCode.includes(MetaConstants.VIEW_AS_STUDENT_ROLE_CODE)).length > 0
    ? 'student'
    : userState?.user?.UserRoles.filter(x => x.UserType === UserPersona.FacultyPersona).length > 0
      ? 'faculty'
      : 'admin'
    }${URLConstants.LAUNCH_URL}`;
}


export function checkAndRedirectToConsent(userState, userConsentSandbox: UserConsentSandbox, authService: AuthService, router: Router) {
  userConsentSandbox.getConsent().subscribe(consentResponse => {
    const targetUrl: string = authService.redirectUrl;
    if (consentResponse?.consented) {
      localStorage.setItem("user.consent.consentedAt", consentResponse.consentedAt);
      router.navigateByUrl(`${getLaunchUrl(userState)}`);
    }
    else {
      //redirect to consent
      Logger.trace(`User Effect  => LoginSuccess effect => Consent is not given so Redirect to Consent page  => User Info: ${JSON.stringify(userState?.user)} | current Token: ${JSON.stringify(userState?.user.Token)} | active Route`);
      router.navigateByUrl(URLConstants.UserConsent_URL);
    }
  });
}
