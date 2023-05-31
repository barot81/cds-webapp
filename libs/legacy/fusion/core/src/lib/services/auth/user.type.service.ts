import {Injectable} from "@angular/core";
import {UserPersona} from "@zhealthcare/fusion/models";
import {OucodeHelper} from "../../helper/oucodes/oucode-helper";
import {MetaConstants} from "../../helper/constants";
import {Subject} from "rxjs";

const ACTIVE_USER_TYPE_KEY_NAME = "ActiveUserType";

@Injectable({
  providedIn: "any"
})
export class UserTypeService {
  currentTenantId: string;
  currentOucode: string;

  currentUserPersona: UserPersona;

  userPersona$: Subject<UserPersona> = new Subject<UserPersona>();

  constructor() {
    // const oucodeList = OucodeHelper.getOuCodeFlatList(JSON.parse(localStorage.getItem(MetaConstants.OUCODES)));
    // const selectedOuCode = oucodeList?.find(x => x.isSelected)?.Oucode;
    // this.setCurrentContext(localStorage.getItem(MetaConstants.FACILITYID), selectedOuCode);
  }

  setUserType(userPersona: UserPersona) {
    sessionStorage.setItem(ACTIVE_USER_TYPE_KEY_NAME, userPersona);
    localStorage.setItem(ACTIVE_USER_TYPE_KEY_NAME, userPersona);
  }

  getUserType(): UserPersona {
    const userType = sessionStorage.getItem(ACTIVE_USER_TYPE_KEY_NAME);
    if (userType) {
      const userPersona: UserPersona = UserPersona[userType];
      this.currentUserPersona = userPersona;
      this.userPersona$.next(this.currentUserPersona);
      return userPersona;
    } else if (localStorage.getItem(ACTIVE_USER_TYPE_KEY_NAME)) {
      const userPersona: UserPersona = UserPersona[localStorage.getItem(ACTIVE_USER_TYPE_KEY_NAME)]
      this.currentUserPersona = userPersona
      this.userPersona$.next(this.currentUserPersona);
      return UserPersona[localStorage.getItem(ACTIVE_USER_TYPE_KEY_NAME)]
    }
    else
      return null;
  }

  isFacultyPersonaSelected(): boolean {
    // var userType = sessionStorage.getItem(ACTIVE_USER_TYPE_KEY_NAME);
    // if (userType)
    //   return userType == UserPersona.FacultyPersona;
    // else
    //   userType = localStorage.getItem(ACTIVE_USER_TYPE_KEY_NAME);

    // return userType == UserPersona.FacultyPersona;
    return false;
  }

  setCurrentContext(tenantId: string, oucode: string) {
    this.currentTenantId = tenantId;
    this.currentOucode = oucode;
  }
}
