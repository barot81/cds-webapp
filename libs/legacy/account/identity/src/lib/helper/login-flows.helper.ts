import { Router } from '@angular/router';
import { AuthService, Logger, URLConstants, MetaConstants, UserConsentSandbox  } from '@zhealthcare/fusion/core';
import { UserPersona } from '@zhealthcare/fusion/models';

export function getLaunchUrl(userState) {
  return `${userState?.user?.UserRoles.filter(x => x.UserType === UserPersona.Student && !x.RoleCode.includes(MetaConstants.VIEW_AS_STUDENT_ROLE_CODE)).length > 0
    ? 'student'
    : userState?.user?.UserRoles.filter(x => x.UserType === UserPersona.FacultyPersona).length > 0
      ? 'faculty'
      : 'admin'
    }${URLConstants.LAUNCH_URL}`;
}


export function checkAndRedirectToConsent(userState,  router: Router) {
      router.navigateByUrl(`${getLaunchUrl(userState)}`);
}
