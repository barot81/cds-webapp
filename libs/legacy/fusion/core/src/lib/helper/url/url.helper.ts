import { UserPersona } from "@zhealthcare/fusion/models";
import { MetaConstants, URLConstants } from "../constants";

export function getLaunchUrl(userState) {
  return `${userState?.user?.UserRoles.filter(x => x.UserType === UserPersona.Student && !x.RoleCode.includes(MetaConstants.VIEW_AS_STUDENT_ROLE_CODE)).length > 0
    ? 'student'
    : userState?.user?.UserRoles.filter(x => x.UserType === UserPersona.FacultyPersona).length > 0
      ? 'faculty'
      : 'admin'
    }${URLConstants.LAUNCH_URL}`;
}
